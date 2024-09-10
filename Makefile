# Detect OS
OS := $(shell uname -s)

# Variables
PROJECT_NAME := deposit-tracker
SCRIPTS_DIR := scripts
SRC_DIR := src
BUILD_DIR := core/views/grafana

.PHONY: all
all: build

.PHONY: clean
clean:
	@echo "Cleaning the project..."
	rm -rf $(BUILD_DIR)/*

.PHONY: format
format:
	@echo "Formatting code..."
	# TODO: Add formatting commands here
	# Example -
	# black $(SRC_DIR)

.PHONY: test
test:
	@echo "Running tests..."
ifeq ($(OS),Linux)
	@echo "Running tests on Linux..."
	bash tests/run-tests.sh
else ifeq ($(OS),Darwin) # For macOS
	@echo "Running tests on macOS..."
	bash tests/run-tests.sh
else
	@echo "Running tests on Windows..."
	./tests/run-tests.bat
endif

.PHONY: git-push
git-push:
ifeq ($(OS),Linux)
	@echo "Running Linux script for git commit and push..."
	bash $(SCRIPTS_DIR)/commit_push.sh
else ifeq ($(OS),Darwin)
	@echo "Running macOS script for git commit and push..."
	bash $(SCRIPTS_DIR)/commit_push.sh
else
	@echo "Running Windows batch script for git commit and push..."
	$(SCRIPTS_DIR)\\commit_push.bat
endif

.PHONY: help
help:
	@echo "Available targets:"
	@echo "  all        - Build the project"
	@echo "  clean      - Clean the build directory"
	@echo "  format     - Format the code"
	@echo "  test       - Run tests"
	@echo "  git-push   - Commit and push code changes"
	@echo "  help       - Show this help message"
