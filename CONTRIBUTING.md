# Contributing to Memot

First off, thank you for considering contributing to Memot! It's people like you that make Memot such a great tool.

## How Can I Contribute?

### Reporting Bugs

This section explains how to submit a bug report for Memot. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/memot-app/memot/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/memot-app/memot/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Memot, including completely new features and minor improvements to existing functionality.

- **Perform a cursory search** to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- If you don't find an existing issue, [create a new one](https://github.com/memot-app/memot/issues/new).

### Pull Request Process

1.  Fork the repo and create your branch from `develop`.
2.  If you've added code that should be tested, add tests.
3.  Ensure the test suite passes (`pnpm test`).
4.  Make sure your code lints (`pnpm check`).
5.  Issue that pull request!

## Development Setup

Please refer to the [README.md](./README.md#getting-started) for instructions on how to set up the development environment.

## Code Style

This project uses [Astro](https://docs.astro.build/en/reference/cli-reference/) for type checking and [Biome](https://biomejs.dev/) for code formatting and linting. Also, we have `lefthook` configured to automatically check and format your code on every commit. Therefore, you do not need to run the checking and formatting commands manually.

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Please ensure your commit messages are in this format.

Example:

```
feat: add user authentication feature

This feature allows users to sign up and log in to the application.
```

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.
