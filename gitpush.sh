#!/bin/sh
 
COMENTARIO="$1"

if [ -z "$COMENTARIO" ]
then
  echo ""
  echo "¡Defina un comentario!"
  echo ""
else
  git add .
  git commit -m "$COMENTARIO"
  git push -u origin --all
  git push -u origin --tags
  echo ""
  echo "Process Finished"
  echo ""
fi