.DEFAULT_GOAL := default

setup:=git config core.hooksPath hooks/ && source ~/.nvm/nvm.sh && nvm use

.PHONY: repo
repo:
	@open https://github.com/SMARTeacher/automation_test_interview

.PHONY: clean-all
clean-all:
	-cd ./shared && rm -r ./node_modules
	-cd ./test-projects-ui && rm -r ./node_modules

.PHONY: shared
shared:
	@$(setup) && \
	cd ./shared && npm install

.PHONY: ui-tests
ui-tests: shared
	@$(setup) && \
	cd ./test-projects-ui && npm install

.PHONY: all
all: shared
	@$(setup) && \
	cd ./test-projects-ui && npm install

.PHONY: default
default: clean-all all
