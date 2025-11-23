<template>
    <q-page class="bg-white row">
        <div class="width-responsive q-mx-auto q-my-xl">

            <section class="q-py-xl q-my-xl">
                <div class="text-center">
                    <h1 class="text-h3 text-weight-medium q-ma-xs">Site Map</h1>
                </div>
            </section>

            <section class="q-py-xl q-my-xl">
                <q-tree
                :nodes="siteMapTree"
                node-key="label"
                no-connectors
                default-expand-all
                >
                    <template v-slot:header-root="prop">
                        <div class="width-full row items-center text-h6 text-weight-medium text-teal-8 q-pb-sm border-bs">
                            {{ prop.node.label }}
                        </div>
                    </template>

                    <template v-slot:header-generic="prop">
                        <div class="width-full row items-center text-subtitle1 text-weight-medium text-teal-8 q-pb-sm border-bd">
                            {{ prop.node.label }}
                        </div>
                    </template>

                    <template v-slot:header-text="prop">
                        <div class="width-full row items-center text-body1 text-weight-light q-pb-sm border-bd">
                            {{ prop.node.label }}
                        </div>
                    </template>

                </q-tree>
            </section>

        </div>
    </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar'
import siteMapTree from './SiteMapTree'

const metaData = {
  title: 'Site Map | Attofund'
}

export default {
  setup () {
    useMeta(metaData)
    return {
        siteMapTree
    }
  }
}
</script>