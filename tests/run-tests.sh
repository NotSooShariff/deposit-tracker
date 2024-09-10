#!/bin/sh

# Navigate to the core directory
cd core || exit

# Run Jest tests from the tests/ folder
npx jest tests/
