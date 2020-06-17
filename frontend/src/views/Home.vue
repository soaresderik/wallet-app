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
                  <h4 class="green--text"><span> R$ </span> 200</h4>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <div class="valor">
                  <strong>Saídas</strong>
                  <h4 class="red--text"><span> R$ </span> 200</h4>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-list two-line>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>(650) 555-1234</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>(650) 555-1234</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>(650) 555-1234</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-divider></v-divider>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
};
</script>

<style lang="scss">
.home {
  max-width: 300px;
  margin: 25px auto;
}

.valor {
  text-align: center;

  h4 {
    margin: 5px 0;
    font-size: 30px;

    span {
      font-size: 10px;
    }
  }
}
</style>
