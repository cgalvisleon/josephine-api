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
  ssh -i josephine.pem ubuntu@ec2-34-229-63-205.compute-1.amazonaws.com
  echo ""
  echo "Process Finished"
  echo ""
fi
