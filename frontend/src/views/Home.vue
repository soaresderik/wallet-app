<template>
  <div class="home">
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <div class="valor">
                  <strong>Entradas</strong>
                  <h4 class="green--text">
                    {{ formatNumber(income) }}
                  </h4>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <div class="valor">
                  <strong>Saídas</strong>
                  <h4 class="red--text">
                    {{ formatNumber(expense) }}
                  </h4>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-list v-if="expenses.length > 0" two-line>
          <div v-for="i in expenses" :key="i.id">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ i.description }}</v-list-item-title>
                <v-list-item-subtitle
                  :class="i.value > 0 ? 'green--text' : 'red--text'"
                  >{{ formatNumber(i.value) }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="() => false">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
          </div>
        </v-list>
        <v-list class="text-center" v-else
          ><v-list-item>
            <v-list-item-content>
              <v-list-item-title>Não há registros.</v-list-item-title>
            </v-list-item-content>
          </v-list-item></v-list
        >
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { gql } from "apollo-boost";
import numberFormat from "@/utils/numberFormat";

@Component({
  name: "Home",
})
export default class Home extends Vue {
  expenses: {
    id: string;
    description: string;
    value: number;
  }[] = [];
  income = 0;
  expense = 0;

  formatNumber(n: number) {
    return numberFormat.format(n / 100);
  }

  async mounted() {
    const { data } = await this.$apollo.query({
      query: gql`
        {
          getExpenses {
            id
            description
            createdAt
            value
          }
        }
      `,
    });

    this.expenses = data.getExpenses;

    this.income = this.expenses
      .filter((i) => i.value > 0)
      .reduce((a, b) => a + b.value, 0);

    this.expense =
      this.expenses
        .filter((i) => i.value < 0)
        .reduce((a, b) => a + b.value, 0) * -1;
  }
}
</script>

<style lang="scss">
.home {
  max-width: 300px;
  margin: 25px auto;
}

.valor {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  h4 {
    margin: 5px 0;
    font-size: 20px;

    span {
      font-size: 10px;
    }
  }
}

strong {
  margin: 30px auto !important;
  align-items: center;
}
</style>
