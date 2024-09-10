#!/bin/bash

# Navigate to the project root if needed
cd "$(dirname "$0")/.."

# Ask for a commit message
echo "Enter commit message: "
read commit_message

# Add changes, commit, and push
git add .
git commit -m "$commit_message"
git push

# Confirm success
if [ $? -eq 0 ]; then
    echo "Changes successfully pushed!"
else
    echo "Failed to push changes."
fi
