import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { Unstable_TrapFocus } from "@material-ui/core";

class EditarPreguntaDialog extends Component {
  state = {
    open_for_edit: false,
    formIdPregunta: "",
    pregunta_edit: {
      id: -1,
      pregunta: "",
      explicacion: "",
      nivel: "",
      respuestas: [],
    },
    auxPregunta_edit: {
      id: -1,
      pregunta: "",
      explicacion: "",
      nivel: "",
      respuestas: [],
    },
  };

  constructor(props) {
    super(props);
    this.closePreguntaEditar = this.closePreguntaEditar.bind(this);
  }

  closePreguntaEditar = () => {
    this.props.closePreguntaEditar();
  };

  componentDidMount() {
    this.setState(
      {
        formIdPregunta: this.props.id_pregunta,
      },
      () => {
        this.buscarPreguntaEditar();
      }
    );
  }

  changeEditPregunta = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let pregunta = this.state.pregunta_edit;

    if (e.target.getAttribute("data-campo") == "correcta") {
      let new_respuestas = [];
      pregunta.respuestas.map(function (respuesta, i) {
        if (respuesta.id == e.target.getAttribute("data-id-respuesta")) {
          respuesta.correcta = true;
        } else {
          respuesta.correcta = false;
        }
        new_respuestas.push(respuesta);
      });
      pregunta.respuestas = new_respuestas;
    } else if (name == "nivel") {
      pregunta.nivel = value;
    }

    this.setState({
      pregunta_edit: pregunta,
    });
  };

  closeComponent() {
    this.setState({
      formIdPregunta: "",
      open_for_edit: false,
      pregunta_edit: {
        id: -1,
        pregunta: "",
        explicacion: "",
        nivel: "",
        respuestas: [],
      },
    });
    this.closePreguntaEditar();
  }

  async savePregunta() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `save_pregunta`,
        {
          pregunta: this.state.pregunta_edit,
          email: localStorage.getItem("email_penitenciarios"),
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        toast.success("Pregunta modificada");
        this.closeComponent();
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  async buscarPreguntaEditar() {
    axios
      .post(
        process.env.REACT_APP_URL_API + `buscar_pregunta_para_editar`,
        {
          formIdPregunta: this.state.formIdPregunta,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then((res) => {
        if (
          res.data.pregunta.indexOf("<br") == -1 &&
          res.data.pregunta.indexOf("<p") == -1
        ) {
          res.data.pregunta = res.data.pregunta.replace(/\n/g, "<br />");
        }
        if (
          res.data.explicacion.indexOf("<br") == -1 &&
          res.data.explicacion.indexOf("<p") == -1
        ) {
          res.data.explicacion = res.data.explicacion.replace(/\n/g, "<br />");
        }
        if (
          res.data.respuestas[0] != undefined &&
          res.data.respuestas[0]["respuesta"].indexOf("<br") == -1 &&
          res.data.respuestas[0]["respuesta"].indexOf("<p") == -1
        ) {
          res.data.respuestas[0]["respuesta"] = res.data.respuestas[0][
            "respuesta"
          ].replace(/\n/g, "<br />");
        }
        if (
          res.data.respuestas[1] != undefined &&
          res.data.respuestas[1]["respuesta"].indexOf("<br") == -1 &&
          res.data.respuestas[1]["respuesta"].indexOf("<p") == -1
        ) {
          res.data.respuestas[1]["respuesta"] = res.data.respuestas[1][
            "respuesta"
          ].replace(/\n/g, "<br />");
        }
        if (
          res.data.respuestas[2] != undefined &&
          res.data.respuestas[2]["respuesta"].indexOf("<br") == -1 &&
          res.data.respuestas[2]["respuesta"].indexOf("<p") == -1
        ) {
          res.data.respuestas[2]["respuesta"] = res.data.respuestas[2][
            "respuesta"
          ].replace(/\n/g, "<br />");
        }
        if (
          res.data.respuestas[3] != undefined &&
          res.data.respuestas[3]["respuesta"].indexOf("<br") == -1 &&
          res.data.respuestas[3]["respuesta"].indexOf("<p") == -1
        ) {
          res.data.respuestas[3]["respuesta"] = res.data.respuestas[3][
            "respuesta"
          ].replace(/\n/g, "<br />");
        }

        this.setState(
          {
            pregunta_edit: {
              id: res.data.id,
              pregunta: res.data.pregunta,
              explicacion: res.data.explicacion,
              nivel: res.data.id_nivel,
              respuestas: res.data.respuestas,
            },
            auxPregunta_edit: {
              id: res.data.id,
              pregunta: res.data.pregunta,
              explicacion: res.data.explicacion,
              nivel: res.data.id_nivel,
              respuestas: res.data.respuestas,
            },
          },
          () => {
            this.setState({
              open_for_edit: true,
            });
          }
        );
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  }

  render() {
    let respuesta1 = "";
    return (
      <div>
        <Dialog
          disableAutoFocus={true}
          disableEnforceFocus={true}
          maxWidth="xl"
          open={this.state.open_for_edit}
          onClose={() => {
            this.closeComponent();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Atención</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form className="formEditPregunta" style={{ width: "1200px" }}>
                <label>Pregunta</label>

                <Editor
                  apiKey="nutvo242t720mzb4fkrn98feruvqxrl2pog9q84n2pgsexjz"
                  initialValue={this.state.pregunta_edit.pregunta}
                  init={{
                    height: 200,
                    auto_focus: false,
                    menubar: false,
                    statusbar: false,
                    anchor_top: false,
                    anchor_bottom: false,
                    plugins:
                      "autolink fullscreen link lists charmap emoticons paste",
                    toolbar:
                      "undo redo | paste | bold italic underline strikethrough | fontsizeselect | outdent indent |  numlist bullist | forecolor backcolor  removeformat | charmap emoticons | fullscreen | link",
                    forced_root_block: "",
                    paste_as_text: true,
                  }}
                  onEditorChange={(content, editor) => {
                    let pregunta = this.state.auxPregunta_edit;
                    pregunta.pregunta = content;
                  }}
                  onBlur={(content, editor) => {
                    // console.log(content.target);
                    this.state.pregunta_edit.pregunta =
                      this.state.auxPregunta_edit.pregunta;
                  }}
                />
                <br />
                {this.state.pregunta_edit.respuestas[0] != undefined && (
                  <div>
                    <label>
                      {this.state.pregunta_edit.respuestas[0]["correcta"] && (
                        <input
                          data-id-pregunta={this.state.pregunta_edit.id}
                          data-id-respuesta={
                            this.state.pregunta_edit.respuestas[0]["id"]
                          }
                          data-campo="correcta"
                          onChange={this.changeEditPregunta}
                          type="radio"
                          name="formRespuesta"
                          id="formRespuesta1"
                          checked
                        />
                      )}
                      {!this.state.pregunta_edit.respuestas[0]["correcta"] && (
                        <input
                          data-id-pregunta={this.state.pregunta_edit.id}
                          data-id-respuesta={
                            this.state.pregunta_edit.respuestas[0]["id"]
                          }
                          data-campo="correcta"
                          onChange={this.changeEditPregunta}
                          type="radio"
                          name="formRespuesta"
                          id="formRespuesta1"
                        />
                      )}
                      Respuesta 1
                    </label>
                    <Editor
                      apiKey="nutvo242t720mzb4fkrn98feruvqxrl2pog9q84n2pgsexjz"
                      initialValue={
                        this.state.pregunta_edit.respuestas[0]["respuesta"]
                      }
                      init={{
                        height: 130,
                        auto_focus: false,
                        menubar: false,
                        statusbar: false,
                        anchor_top: false,
                        anchor_bottom: false,
                        plugins:
                          "autolink fullscreen link lists charmap emoticons paste",
                        toolbar:
                          "undo redo | paste | bold italic underline strikethrough | fontsizeselect | outdent indent |  numlist bullist | forecolor backcolor  removeformat | charmap emoticons | fullscreen | link",
                        forced_root_block: "",
                        paste_as_text: true,
                      }}
                      onEditorChange={(content, editor) => {
                        let pregunta = this.state.auxPregunta_edit;
                        pregunta.respuestas[0]["respuesta"] = content;
                      }}
                      onBlur={() =>
                        (this.state.pregunta_edit = this.state.auxPregunta_edit)
                      }
                    />
                  </div>
                )}

                <br />
                {this.state.pregunta_edit.respuestas[1] != undefined && (
                  <div>
                    <label>
                      {this.state.pregunta_edit.respuestas[1]["correcta"] && (
                        <input
                          data-id-pregunta={this.state.pregunta_edit.id}
                          data-id-respuesta={
                            this.state.pregunta_edit.respuestas[1]["id"]
                          }
                          data-campo="correcta"
                          onChange={this.changeEditPregunta}
                          type="radio"
                          name="formRespuesta"
                          id="formRespuesta2"
                          checked
                        />
                      )}
                      {!this.state.pregunta_edit.respuestas[1]["correcta"] && (
                        <input
                          data-id-pregunta={this.state.pregunta_edit.id}
                          data-id-respuesta={
                            this.state.pregunta_edit.respuestas[1]["id"]
                          }
                          data-campo="correcta"
                          onChange={this.changeEditPregunta}
                          type="radio"
                          name="formRespuesta"
                          id="formRespuesta2"
                        />
                      )}
                      Respuesta 2
                    </label>

                    <Editor
                      apiKey="nutvo242t720mzb4fkrn98feruvqxrl2pog9q84n2pgsexjz"
                      initialValue={
                        this.state.pregunta_edit.respuestas[1]["respuesta"]
                      }
                      init={{
                        height: 130,
                        auto_focus: false,
                        menubar: false,
                        statusbar: false,
                        anchor_top: false,
                        anchor_bottom: false,
                        plugins:
                          "autolink fullscreen link lists charmap emoticons paste",
                        toolbar:
                          "undo redo | paste | bold italic underline strikethrough | fontsizeselect | outdent indent |  numlist bullist | forecolor backcolor  removeformat | charmap emoticons | fullscreen | link",
                        forced_root_block: "",
                        paste_as_text: true,
                      }}
                      onEditorChange={(content, editor) => {
                        let pregunta = this.state.auxPregunta_edit;
                        pregunta.respuestas[1]["respuesta"] = content;
                      }}
                      onBlur={() =>
                        (this.state.pregunta_edit = this.state.auxPregunta_edit)
                      }
                    />
                  </div>
                )}

                <br />
                {this.state.pregunta_edit.respuestas[2] != undefined && (
                  <div>
                    <label>
                      {this.state.pregunta_edit.respuestas[2]["correcta"] && (
                        <input
                          data-id-pregunta={this.state.pregunta_edit.id}
                          data-id-respuesta={
                            this.state.pregunta_edit.respuestas[2]["id"]
                          }
                          data-campo="correcta"
                          onChange={this.changeEditPregunta}
                          type="radio"
                          name="formRespuesta"
                          id="formRespuesta3"
                          checked
                        />
                      )}
                      {!this.state.pregunta_edit.respuestas[2]["correcta"] && (
                        <input
                          data-id-pregunta={this.state.pregunta_edit.id}
                          data-id-respuesta={
                            this.state.pregunta_edit.respuestas[2]["id"]
                          }
                          data-campo="correcta"
                          onChange={this.changeEditPregunta}
                          type="radio"
                          name="formRespuesta"
                          id="formRespuesta3"
                        />
                      )}
                      Respuesta 3
                    </label>

                    <Editor
                      apiKey="nutvo242t720mzb4fkrn98feruvqxrl2pog9q84n2pgsexjz"
                      initialValue={
                        this.state.pregunta_edit.respuestas[2]["respuesta"]
                      }
                      init={{
                        height: 130,
                        auto_focus: false,
                        menubar: false,
                        statusbar: false,
                        anchor_top: false,
                        anchor_bottom: false,
                        plugins:
                          "autolink fullscreen link lists charmap emoticons paste",
                        toolbar:
                          "undo redo | paste | bold italic underline strikethrough | fontsizeselect | outdent indent |  numlist bullist | forecolor backcolor  removeformat | charmap emoticons | fullscreen | link",
                        forced_root_block: "",
                        paste_as_text: true,
                      }}
                      onEditorChange={(content, editor) => {
                        let pregunta = this.state.auxPregunta_edit;
                        pregunta.respuestas[2]["respuesta"] = content;
                      }}
                      onBlur={() =>
                        (this.state.pregunta_edit = this.state.auxPregunta_edit)
                      }
                    />
                  </div>
                )}

                <br />
                {this.state.pregunta_edit.respuestas[3] != undefined && (
                  <div>
                    <label>
                      {this.state.pregunta_edit.respuestas[3]["correcta"] && (
                        <input
                          data-id-pregunta={this.state.pregunta_edit.id}
                          data-id-respuesta={
                            this.state.pregunta_edit.respuestas[3]["id"]
                          }
                          data-campo="correcta"
                          onChange={this.changeEditPregunta}
                          type="radio"
                          name="formRespuesta"
                          id="formRespuesta4"
                          checked
                        />
                      )}
                      {!this.state.pregunta_edit.respuestas[3]["correcta"] && (
                        <input
                          data-id-pregunta={this.state.pregunta_edit.id}
                          data-id-respuesta={
                            this.state.pregunta_edit.respuestas[3]["id"]
                          }
                          data-campo="correcta"
                          onChange={this.changeEditPregunta}
                          type="radio"
                          name="formRespuesta"
                          id="formRespuesta4"
                        />
                      )}
                      Respuesta 4
                    </label>

                    <Editor
                      apiKey="nutvo242t720mzb4fkrn98feruvqxrl2pog9q84n2pgsexjz"
                      initialValue={
                        this.state.pregunta_edit.respuestas[3]["respuesta"]
                      }
                      init={{
                        height: 130,
                        auto_focus: false,
                        menubar: false,
                        statusbar: false,
                        anchor_top: false,
                        anchor_bottom: false,
                        plugins:
                          "autolink fullscreen link lists charmap emoticons paste",
                        toolbar:
                          "undo redo | paste | bold italic underline strikethrough | fontsizeselect | outdent indent |  numlist bullist | forecolor backcolor  removeformat | charmap emoticons | fullscreen | link",
                        forced_root_block: "",
                        paste_as_text: true,
                      }}
                      onEditorChange={(content, editor) => {
                        let pregunta = this.state.auxPregunta_edit;
                        pregunta.respuestas[3]["respuesta"] = content;
                      }}
                      onBlur={() =>
                        (this.state.pregunta_edit = this.state.auxPregunta_edit)
                      }
                    />
                  </div>
                )}

                <br />
                <label>Solución</label>
                <Editor
                  apiKey="nutvo242t720mzb4fkrn98feruvqxrl2pog9q84n2pgsexjz"
                  initialValue={this.state.pregunta_edit.explicacion}
                  init={{
                    height: 200,
                    auto_focus: false,
                    menubar: false,
                    statusbar: false,
                    anchor_top: false,
                    anchor_bottom: false,
                    plugins:
                      "autolink fullscreen link lists charmap emoticons paste",
                    toolbar:
                      "undo redo | paste | bold italic underline strikethrough | fontsizeselect | outdent indent |  numlist bullist | forecolor backcolor  removeformat | charmap emoticons | fullscreen | link",
                    forced_root_block: "",
                    paste_as_text: true,
                  }}
                  onEditorChange={(content, editor) => {
                    let pregunta = this.state.auxPregunta_edit;
                    pregunta.explicacion = content;
                  }}
                  onBlur={() =>
                    (this.state.pregunta_edit = this.state.auxPregunta_edit)
                  }
                />
                <br />
                <label>Nivel</label>
                <select
                  onChange={this.changeEditPregunta}
                  name="nivel"
                  defaultValue={this.state.pregunta_edit.nivel}
                >
                  <option value="5ea6ad3dbb5c000045007637">Básico</option>
                  <option value="5ea6ad4abb5c000045007638">Intermedio</option>
                  <option value="5ea6ad51bb5c000045007639">Avanzado</option>
                </select>
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="btn btn-primary"
              onClick={() => {
                this.closeComponent();
              }}
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              className="btn btn-primary"
              onClick={() => this.savePregunta()}
              color="primary"
              autoFocus
            >
              Guardar cambios
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditarPreguntaDialog;
