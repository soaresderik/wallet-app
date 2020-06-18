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

        <v-col>
          <v-tabs v-model="tabs" fixed-tabs>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tabs-1" class="primary--text">
              <v-icon>mdi-history</v-icon>
            </v-tab>

            <v-tab href="#tabs-2" class="primary--text">
              <v-icon>mdi-plus</v-icon>
            </v-tab>
          </v-tabs>
        </v-col>
        <v-tabs-items v-model="tabs">
          <v-tab-item value="tabs-1">
            <v-card flat>
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
                      <v-btn icon @click="handleDelete(i.id)">
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
            </v-card>
          </v-tab-item>
          <v-tab-item value="tabs-2">
            <v-card flat>
              <v-form ref="form">
                <v-text-field
                  v-model="description"
                  outlined
                  label="Descrição"
                  :rules="[(v) => !!v || 'Descrição é obrigatório']"
                />
                <v-text-field
                  v-model="value"
                  outlined
                  label="Valor"
                  :rules="[
                    (v) => !!v || 'Valor é obrigatório',
                    (v) =>
                      (v && !!Number(v)) || 'Valor deve ser apenas números',
                  ]"
                />

                <v-btn block outlined color="primary" @click="handleSubmit"
                  >Salvar</v-btn
                >
              </v-form>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import numberFormat from "@/utils/numberFormat";
import { GET_EXPENSES, CREATE_EXPENSE, DELETE_EXPENSE } from "@/queries";

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
  tabs: string | null = null;
  description = "";
  value: number | null = null;

  formatNumber(n: number) {
    return numberFormat.format(n / 100);
  }

  async mounted() {
    const { data } = await this.$apollo.query({
      query: GET_EXPENSES,
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

  async handleSubmit() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      await this.$apollo.mutate({
        mutation: CREATE_EXPENSE,
        variables: {
          description: this.description,
          value: Number(this.value),
        },
      });

      this.description = "";
      this.value = null;

      this.tabs = "tabs-1";
    }
  }

  async handleDelete(id: string) {
    await this.$apollo.mutate({
      mutation: DELETE_EXPENSE,
      variables: {
        id,
      },
    });
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
