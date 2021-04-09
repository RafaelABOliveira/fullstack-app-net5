<template>
  <div>
    <div style="margin-top: 50px"></div>
    <g-loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col lg="12">
          <b-button
            variant="outline-light"
            size="sm"
            style="background-color: green; border-radius: 50%; width: 50px; height: 50px;"
            class="mr-2 float-right btn-novo-registro"
            @click="editar(null)"
          >
            <b-icon-plus font-scale="1.5"></b-icon-plus>
          </b-button>
          <b-table
            responsive
            striped
            hover
            selectable
            ref="selectableTable"
            select-mode="range"
            @row-selected="selecionadas"
            :items="items"
            :fields="fields"
            outlined
            class="table-light rounded d-none d-lg-block"
          >
            <template v-slot:cell(selected)="{ rowSelected }">
              <b-icon-check
                font-scale="1.5"
                v-if="rowSelected"
                variant="primary"
              ></b-icon-check>
              <b-icon-check
                font-scale="1.5"
                v-else
                style="color: #cccccc"
              ></b-icon-check>
            </template>
            <template v-slot:cell(show_details)="data">
              <b-button
                variant="primary"
                size="sm"
                class="mr-2"
                @click="editar(data.item.usuarioId)"
              >
                <b-icon-pencil font-scale="1.2"></b-icon-pencil>
              </b-button>
              <b-button
                variant="danger"
                size="sm"
                class="float-right"
                @click="excluir(data.item.usuarioId)"
              >
                <b-icon-trash font-scale="1.2"></b-icon-trash>
              </b-button>
            </template>
          </b-table>

          <b-table
            responsive
            striped
            hover
            selectable
            ref="selectableTableMobile"
            select-mode="multi"
            @row-selected="selecionadas"
            :items="items"
            :fields="fieldsMobile"
            outlined
            class="table-light rounded d-block d-lg-none"
          >
            <template v-slot:cell(selected)="{ rowSelected }">
              <b-icon-check
                font-scale="1.5"
                v-if="rowSelected"
                variant="primary"
              ></b-icon-check>
              <b-icon-check
                font-scale="1.5"
                v-else
                style="color: #cccccc"
              ></b-icon-check>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      no-enforce-focus="true"
      data-focus="false"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      v-model="modal"
      size="xl"
      hide-footer
      :title="form.usuarioId == 0 ? 'Cadastrar Usuário' : 'Atualizar Usuário'"
    >
      <div class="d-block text-left">
        <b-form>
          <b-row>
            <b-col lg="6">
              <b-form-group
                id="input-group-1"
                label="Nome:"
                label-for="input-1"
                description="Campo obrigatório. Máximo 255 caracteres"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.nome"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col lg="6">
              <b-form-group
                id="input-group-1"
                label="Email:"
                label-for="input-1"
                description="Campo obrigatório. Máximo 255 caracteres"
              >
                <b-form-input
                  id="input-1"
                  v-if="form.usuarioId == 0"
                  v-model="form.email"
                  type="email"
                ></b-form-input>
                <b-form-input
                  id="input-1"
                  v-else
                  v-model="form.email"
                  type="email"
                  disabled
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col lg="6">
              <b-form-group
                id="input-group-1"
                label="Senha:"
                label-for="input-1"
                description="Campo obrigatório. Máximo 255 caracteres"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.senha"
                  type="password"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col lg="6">
              <b-form-group
                id="input-group-1"
                label="Regras:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.regras"
                  type="number"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col lg="2">
              <b-form-group class="text-left">
                Status:
                <b-form-checkbox
                  v-model="form.statusUsuario"
                  name="check-button"
                  switch
                  size="lg"
                ></b-form-checkbox>
              </b-form-group>
            </b-col>

            <b-col lg="5">
              <b-form-group
                id="input-group-1"
                label="Data de Criação:"
                label-for="input-1"
              >
                <b-form-input
                  disabled
                  v-model="form.dataInclusao"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col lg="5">
              <b-form-group
                id="input-group-1"
                label="Data de Atualização:"
                label-for="input-1"
              >
                <b-form-input
                  disabled
                  v-model="form.dataAlteracao"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </div>
      <div class="d-block text-right">
        <hr />
        <b-button class="mt-3 mr-3" variant="success" @click="salvar(form)"
          >Salvar</b-button
        >
        <b-button class="mt-3" variant="danger" @click="fecharModal()"
          >Fechar</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import ApiService from "../services/api.service";

export default {
  data() {
    return {
      fields: [
        {
          key: "selected",
          label: "",
          thStyle: {
            width: "15px",
          },
        },
        {
          key: "usuarioId",
          label: "ID",
        },
        {
          key: "nome",
          label: "Nome",
          sortable: true,
        },
        {
          key: "email",
          label: "E-mail",
          sortable: true,
        },
        {
          key: "dataInclusao",
          label: "Data de Inclusão",
          sortable: true,
        },
        {
          key: "dataAlteracao",
          label: "Data de Alteração",
          sortable: true,
        },
        {
          key: "regras",
          label: "Regras",
          sortable: true,
        },
        {
          key: "statusUsuario",
          label: "Status",
        },
        {
          key: "show_details",
          label: "",
          thStyle: {
            width: "200px",
          },
        },
      ],
      loading: false,
      items: [],
      form: {},
    };
  },
  methods: {
    async loadData() {
      this.items = [];
      this.form = {};

      this.loading = true;
      await ApiService.get("Usuarios")
        .then((response) => {
          this.items = response.data.map((entry) => {
            (entry.dataInclusao = ApiService.formatDate(entry.dataInclusao)),
              (entry.dataAlteracao = ApiService.formatDate(
                entry.dataAlteracao
              )),
              (entry.statusUsuario =
                entry.statusUsuario == true ? "Ativo" : "Inativo");

            return entry;
          });
        })
        .catch((error) => {
          error;
        })
        .then(() => {
          this.loading = false;
        });
    },

    filtrar(obj) {
      ApiService.get(
        `Usuarios/${obj.nome}/${obj.email}/${obj.regras}/${obj.statusUsuario}`
      )
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          error;
        });
    },

    validacao(obj) {
      let erro = 0;
      let msg = "";

      if (obj.nome == null || obj.nome == "") {
        erro = 1;
        msg = "Campo NOME é obrigatório";
      } else if (obj.nome.length > 255) {
        erro = 1;
        msg = "Campo NOME excedeu o limite de caracteres";
      } else if (obj.email == null || obj.email == "") {
        erro = 1;
        msg = "Campo EMAIL é obrigatório";
      } else if (obj.email.length > 255) {
        erro = 1;
        msg = "Campo Email excedeu o limite de caracteres";
      } else if (obj.senha == null || obj.senha == "") {
        erro = 1;
        msg = "Campo SENHA é obrigatório";
      } else if (obj.senha.length > 12) {
        erro = 1;
        msg = "Campo SENHA excedeu o limite de caracteres";
      }

      if (erro) {
        this.loading = false;
        this.$swal("Ops, ocorreu um erro!", "Erro: " + msg, "error");
        return true;
      }
      return false;
    }, 
    salvar(obj) {
      this.loading = true;

          if (this.validacao(obj)) return false;
       
      ApiService.post(`Usuarios/${obj.usuarioId == 0 ? "add" : "update"}`, {
        usuarioId: parseInt(obj.usuarioId),
        nome: obj.nome,
        email: obj.email,
        senha: obj.senha,
        regras: obj.regras,
        statusUsuario: obj.statusUsuario,
      })
        .then(() => {
          this.form = {};
          //   this.items.push(response.data);
          this.loadData();

          this.modal = false;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$swal("Ops, ocorreu um erro!", "Erro: " + error, "error");
        });
    },
    excluir(id) {
      this.$swal({
        title: "Tem certeza que deseja excluir?",
        text: "Essa operação não pode ser revertida",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          ApiService.post(`Usuarios/remove/${id}`)
            .then(() => {
              this.loading = true;
              this.$swal(
                "Excluído!",
                "O registro foi excluído com sucesso.",
                "success"
              );

              this.loadData();
            })
            .catch((error) => {
              this.loading = true;
              this.$swal("Ops, ocorreu um erro!", error, "error");

              this.loadData();
            });
        } else {
          this.loadData();
        }
      });
    },
    editar(id) {
      this.loading = true;

      this.form = {};

      if (id != null) {
        ApiService.get("Usuarios/" + id)
          .then((response) => {
            this.form = response.data;
          })
          .catch((error) => {
            error;
          })
          .then(() => {
            this.loading = false;
            this.modal = true;
          });
      } else {
        this.form.usuarioId = 0;
        this.modal = true;
      }
    },
    fecharModal() {
      this.form = {};
      this.modal = false;

      this.loadData();
    },

    formatDate(date) {
      return ApiService.formatDate(date);
    },
  },

  beforeMount() {
    this.loadData();
  },
};
</script>
