<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import NavLinks from '@/components/ui/NavLinks.vue';
import LPHome from '@/components/LPHome.vue';
import LPHowItWorks from '@/components/LPHowItWorks.vue';
import LPBlog from '@/components/LPBlog.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div>
    <Navbar />
    <NavLinks />
    <LPHome />
    <LPHowItWorks />
    <LPBlog />
    <Footer />
  </div>
</template>
