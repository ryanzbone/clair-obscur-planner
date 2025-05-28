#!/bin/bash

HTML_FILE="data.html"

xmllint --html --xpath '//table//tr[position()>1]' "$HTML_FILE" 2>/dev/null | \
pup 'tr json{}' | jq '
  map({
    name: .children[0].children[1].text,
    link: .children[0].children[0].href,
    image: .children[0].children[0].children[0].src,
    cost: (.children[2].text | tonumber),
    raw_details: (.children[1].html |
      gsub("<hr[^>]*>"; "\n") |
      gsub("<[^>]+>"; "") |
      gsub("&nbsp;"; " ") |
      split("\n") |
      map(gsub("^\\s+|\\s+$"; "") | select(. != ""))
    )
  }) | map(
    . + (
      reduce .raw_details[] as $line (
        {};
        if $line | test(":") then
          . + { ($line | split(":")[0]): ($line | split(":")[1:] | join(":") | gsub("^\\s+"; "")) }
        else
          . + { "Notes": ($line) }
        end
      )
    ) | del(.raw_details)
  )
'

