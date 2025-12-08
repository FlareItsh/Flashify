<script setup lang="ts">
import Button from './ui/Button.vue'
</script>

<template>
  <div class="min-h-screen p-8">
    <!-- Header Section -->
    <header class="mb-12">
      <h1 class="mb-2">Flashcards Maker</h1>
      <p class="text-foreground-muted text-xl">Brand Guidelines & Color System Showcase</p>
    </header>

    <!-- Typography Section -->
    <section class="mb-12">
      <h2 class="border-border mb-4 border-b pb-2">Typography</h2>
      <div class="space-y-3">
        <div>
          <h1>Heading 1 - Display Large</h1>
        </div>
        <div>
          <h2>Heading 2 - Display Medium</h2>
        </div>
        <div>
          <h3>Heading 3 - Title Large</h3>
        </div>
        <div>
          <h4>Heading 4 - Title Medium</h4>
        </div>
        <div>
          <h5>Heading 5 - Title Small</h5>
        </div>
        <div>
          <h6>Heading 6 - Label</h6>
        </div>
        <div class="mt-4 space-y-2">
          <p class="text-foreground">Body text - Primary foreground</p>
          <p class="text-foreground-muted">Body text - Muted (secondary content)</p>
          <p class="text-foreground-subtle">Body text - Subtle (hints & placeholders)</p>
        </div>
      </div>
    </section>

    <!-- Brand Colors Section -->
    <section class="mb-12">
      <h2 class="border-border mb-4 border-b pb-2">Brand Colors</h2>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div class="space-y-2">
          <div class="bg-primary h-24 rounded-lg"></div>
          <p class="font-medium">Primary</p>
          <p class="text-foreground-subtle text-sm">#8ECAE6 - Light Blue</p>
        </div>
        <div class="space-y-2">
          <div class="bg-secondary h-24 rounded-lg"></div>
          <p class="font-medium">Secondary</p>
          <p class="text-foreground-subtle text-sm">#219EBC - Dark Blue</p>
        </div>
        <div class="space-y-2">
          <div class="bg-tertiary h-24 rounded-lg"></div>
          <p class="font-medium text-white">Tertiary</p>
          <p class="text-foreground-subtle text-sm">#023047 - Navy</p>
        </div>
        <div class="space-y-2">
          <div class="bg-accent h-24 rounded-lg"></div>
          <p class="font-medium">Accent</p>
          <p class="text-foreground-subtle text-sm">#FFB703 - Yellow</p>
        </div>
      </div>
    </section>

    <!-- Status Colors Section -->
    <section class="mb-12">
      <h2 class="border-border mb-4 border-b pb-2">Status Colors</h2>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div class="space-y-2">
          <div class="bg-warning h-24 rounded-lg"></div>
          <p class="font-medium">Warning</p>
          <p class="text-foreground-subtle text-sm">#FB8500 - Orange</p>
        </div>
        <div class="space-y-2">
          <div class="bg-danger h-24 rounded-lg"></div>
          <p class="font-medium">Danger</p>
          <p class="text-foreground-subtle text-sm">Pastel Red</p>
        </div>
      </div>
    </section>

    <!-- UI Elements Section -->
    <section class="mb-12">
      <h2 class="border-border mb-4 border-b pb-2">UI Elements</h2>
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Sidebar Example -->
        <div>
          <h3 class="mb-3">Sidebar</h3>
          <div class="bg-sidebar border-border rounded-lg border p-6">
            <p class="text-sidebar-foreground mb-4 font-medium">Navigation Menu</p>
            <ul class="space-y-2">
              <li class="bg-sidebar-accent rounded px-3 py-2 text-white">Active Item</li>
              <li class="text-sidebar-foreground hover:bg-sidebar-accent/10 rounded px-3 py-2">
                Menu Item
              </li>
              <li class="text-sidebar-foreground hover:bg-sidebar-accent/10 rounded px-3 py-2">
                Menu Item
              </li>
            </ul>
          </div>
        </div>

        <!-- Modal Example -->
        <div>
          <h3 class="mb-3">Modal</h3>
          <div class="bg-modal border-border rounded-lg border p-6 shadow-lg">
            <h4 class="text-modal-foreground mb-2">Modal Title</h4>
            <p class="text-foreground-muted mb-4 text-sm">
              This is a modal dialog with custom styling
            </p>
            <Button
              variant="accent"
              size="default"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Borders Section -->
    <section class="mb-12">
      <h2 class="border-border mb-4 border-b pb-2">Borders</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="border-border rounded-lg border p-4">
          <p class="text-foreground-muted">Default border color</p>
        </div>
        <div class="border-border-accent rounded-lg border-2 p-4">
          <p class="text-foreground-muted">Accent border color</p>
        </div>
      </div>
    </section>

    <!-- Interactive Examples -->
    <section class="mb-12">
      <h2 class="border-border mb-4 border-b pb-2">Interactive Components</h2>
      <div class="flex flex-wrap gap-3">
        <Button variant="default">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="accent">Accent Button</Button>
        <Button variant="destructive">Danger Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="link">Link Button</Button>
      </div>
      <div class="mt-4 flex flex-wrap gap-3">
        <Button
          variant="default"
          size="sm"
        >
          Small Button
        </Button>
        <Button
          variant="default"
          size="default"
        >
          Default Button
        </Button>
        <Button
          variant="default"
          size="lg"
        >
          Large Button
        </Button>
      </div>
    </section>

    <!-- Cards Section -->
    <section>
      <h2 class="border-border mb-4 border-b pb-2">Card Examples</h2>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="border-border dark:bg-background rounded-lg border bg-white p-6 shadow-sm">
          <h4 class="mb-2">Default Card</h4>
          <p class="text-foreground-muted text-sm">
            A simple card with default background and border
          </p>
        </div>
        <div class="border-primary bg-primary/5 rounded-lg border-2 p-6">
          <h4 class="text-primary mb-2">Primary Card</h4>
          <p class="text-foreground-muted text-sm">Card with primary color accent</p>
        </div>
        <div class="border-accent bg-accent/5 rounded-lg border-2 p-6">
          <h4 class="text-accent mb-2">Accent Card</h4>
          <p class="text-foreground-muted text-sm">Card with accent color highlight</p>
        </div>
      </div>
    </section>
  </div>
</template>
