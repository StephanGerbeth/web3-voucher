<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    permanent
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Sandra Adams"
        subtitle="sandra_a88@gmailcom"
      />
    </v-list>

    <v-divider />

    <v-list
      density="compact"
      nav
    >
      <v-list-item
        to="/dashboard"
        :prepend-icon="$vuetify.icons.aliases.overview"
        title="Overview"
      />
      <v-list-item
        to="/dashboard/assets"
        :prepend-icon="$vuetify.icons.aliases.assets"
        title="Assets"
      />
      <v-list-item
        :prepend-icon="$vuetify.icons.aliases.renew"
        title="Shared with me"
        value="shared"
      />
      <v-list-item
        :prepend-icon="$vuetify.icons.aliases.renew"
        title="Starred"
        value="starred"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {

};
</script>
