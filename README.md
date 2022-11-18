# How to commit in this monorepo?

First commit that relates to apps or libs should be tagged with app or lib related tag unless it should be tagged with action i.e. fix:, add:, and etc.

## How to Tag?

These or the rules of tagging:

- Rule 1: if its an app first tag should be name of app and second should be action like **frontend:feat:**.
- Rule 2: if its a lib first tag should be **libs:** and second should be name of lib and then the name of action like **libs:common:feat:**.
- Rule 3: if its relates to the whole monorepo like adding package or changing a config it should be only tagged with the action like **feat:**.

## List of allowed actions

- fix: fixing something
- feat: adding a new feature or adding new package
- remove: removing something
- refactor: refactoring things like changing tool or replacing with another one
- move: move a piece to other place
- improve: improve the overall code like more cleaner and etc
- tidy: cleaning up code or format the code
- build
- ci
- chore
- docs: adding docs(barely need to use this)
- revert: reverting a change
- test: adding test
- perf: performance improvement

## Overall language

You should use the simple form of verbs like fix not fixes or fixed.

## How to write commit messages?

Short messages might be clear and as short as possible and you should not include details.

Long messages should be clear and dig deep into the details, you should explain things in a simple and compact form.

## Warning

There might be some commits that doesn't follow these instructions but they were committed before writing these instructions.
