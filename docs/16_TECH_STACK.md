---

title: Technology Stack
document: Wayora Blueprint
file: docs/16_TECH_STACK.md
version: 1.0.0
status: Approved
owner: Wayora

authors:

* Tolga B.
* OpenAI ChatGPT

created: 2026-06-29
last_updated: 2026-06-29

dependencies:

* 04_SYSTEM_ARCHITECTURE.md
* 12_INFRASTRUCTURE.md

---

# Technology Stack

## Purpose

This document defines the official technology stack of Wayora.

Technology decisions should prioritize:

* Simplicity
* Long-term maintainability
* AI integration
* Developer Experience
* Type Safety
* Performance

The stack is intentionally conservative.

Stable technologies are preferred over trending technologies.

---

# Engineering Principles

One programming language whenever possible.

Type-safe end-to-end.

Container-first.

Cloud agnostic.

Open-source friendly.

Replaceable infrastructure.

AI-native development.

---

# Programming Language

Primary

TypeScript

Reasons

Shared types

Shared validation

Shared SDK

Shared utilities

Lower maintenance cost

Large ecosystem

AI tooling compatibility

---

# Runtime

Primary

Bun

Reasons

Fast startup

Native TypeScript

Excellent package manager

Fast test runner

Node compatibility

Future-proof

Fallback

Node.js LTS

---

# Monorepo

pnpm Workspace

TurboRepo

Reasons

Shared packages

Incremental builds

Fast caching

Simple deployment

Shared types

Shared UI

---

# Frontend

Framework

Next.js

Language

TypeScript

UI

React

Styling

TailwindCSS

Components

shadcn/ui

Animations

Framer Motion

State

Zustand

Server State

TanStack Query

Validation

Zod

Maps

Mapbox GL JS

Charts

Recharts

Icons

Lucide

---

# Mobile

React Native

Expo

Expo Router

Native Modules

Swift

Kotlin

Future

React Native Skia

---

# Backend

Framework

Hono

Reasons

Fast

Minimal

Streaming

Edge compatible

Excellent TypeScript support

No unnecessary abstraction

---

# Validation

Zod

Used everywhere.

Frontend

Backend

API

MCP

Configuration

Environment

AI Structured Output

---

# API

GraphQL

REST

WebSocket

Internal

gRPC

GraphQL remains the primary client interface.

---

# ORM

Drizzle ORM

Reasons

SQL-first

Type-safe

Simple migrations

Excellent PostgreSQL support

No runtime reflection

---

# Database

PostgreSQL

Reasons

Reliable

ACID

Extensions

JSONB

PostGIS

Excellent ecosystem

---

# Geospatial

PostGIS

Used for:

Distance

Radius

Coordinates

Geo Search

Route Analytics

Map Queries

---

# Cache

Redis

Uses

Cache

Sessions

Realtime

Rate Limits

Temporary Planning State

Queues

---

# Queue

BullMQ

Reasons

Redis-based

Reliable

Simple

Scalable

Supports delayed jobs

---

# Search

OpenSearch

Indexes

Places

Journeys

Recommendations

Documentation

Future semantic search.

---

# Object Storage

Development

MinIO

Production

Amazon S3

Compatible providers supported.

---

# AI

Primary SDK

Vercel AI SDK

Model Providers

OpenAI

Anthropic

Google

OpenRouter

Ollama

Azure OpenAI

Enterprise Models

Models remain replaceable.

---

# Embeddings

Provider-independent.

Examples

OpenAI

Voyage

Jina

Nomic

Local Embeddings

Chosen by configuration.

---

# Vector Database

Qdrant

Reasons

Open Source

Fast

Simple

Excellent API

Container Friendly

Future

pgvector

Supported.

---

# Authentication

Better Auth

Reasons

Modern

TypeScript

Passkeys

OAuth

OIDC

Session support

Database integration

---

# Authorization

CASL

Policy-based authorization.

Future

OpenFGA

Enterprise deployments.

---

# Observability

OpenTelemetry

Prometheus

Grafana

Tempo

Loki

Sentry

Langfuse

---

# Infrastructure

Docker

Docker Compose

Traefik

Kubernetes

Terraform

Helm

---

# CI/CD

GitHub Actions

Release Please

Renovate

Dependabot

Trivy

CodeQL

---

# Testing

Vitest

Playwright

Testing Library

Supertest

MSW

k6

---

# Documentation

Markdown

Mermaid

OpenAPI

GraphQL SDL

Storybook

Typedoc

---

# Package Structure

apps/

services/

packages/

mcp/

docs/

docker/

scripts/

infrastructure/

No package may depend on application code.

---

# Shared Packages

packages/ui

packages/types

packages/sdk

packages/config

packages/eslint

packages/tsconfig

packages/utils

packages/events

packages/database

packages/prompts

Shared packages remain framework-independent.

---

# Coding Standards

Strict TypeScript

ESLint

Prettier

Conventional Commits

Changesets

Semantic Versioning

No any.

No implicit any.

No disabled lint rules.

---

# Performance Targets

Web Startup

<2s

Planning

<5s

Realtime Update

<300ms

GraphQL

<150ms

WebSocket Connect

<500ms

AI Streaming

<800ms

---

# Dependency Policy

Prefer:

Open Source

MIT

Apache 2.0

Avoid abandoned libraries.

Minimize dependencies.

Prefer platform APIs.

---

# Future Stack

Edge Runtime

Bun Native

Cloudflare Workers

GPU Planning

On-device AI

WebAssembly

Rust Performance Modules

---

# Approved Technologies

Language

TypeScript

Frontend

Next.js

Backend

Hono

Database

PostgreSQL

ORM

Drizzle

Cache

Redis

Search

OpenSearch

Queue

BullMQ

Validation

Zod

Maps

Mapbox

Container

Docker

AI SDK

Vercel AI SDK

Observability

Grafana Stack

Deployment

Kubernetes

---

# Acceptance Criteria

Technology stack is standardized.

Every major dependency has a defined purpose.

Future migrations remain possible.

AI providers remain replaceable.

Developer experience is prioritized.

Type safety exists end-to-end.

---

# Open Questions

Should pgvector replace Qdrant for smaller deployments?

Should Bun become mandatory after production maturity?

Should OpenSearch remain optional during MVP?

Should enterprise deployments support MSSQL?

Should Hono eventually migrate to a service mesh architecture?
