import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { BsTrash } from "react-icons/bs";
import { IoMdCopy } from "react-icons/io";
import { AiOutlineSend, AiOutlineFileAdd } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";

function EditTemas() {
  const { id } = useParams();
  const history = useHistory();
  const [temaName, setTemaName] = useState("");
  const [abrev, setAbrev] = useState("");
  const [preguntasTema, setPreguntasTema] = useState([]);
  const [viewDialog, setViewDialog] = useState(false);
  const [base, setBase] = useState(null);
  const [file, setFile] = useState(null);

  const sendFile = async () => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_URL_API + "upload_tema_new/" + id,
        {
          email: localStorage.getItem("email_penitenciarios"),
          file: base,
          name: file.name.slice(0, -5),
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      );
      toast.success("Datos actualizados");
      axios
        .get(process.env.REACT_APP_URL_API + `all_tema_data/` + id, {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        })
        .then(({ data }) => {
          setTemaName(data.tema.name);
          setAbrev(data.tema.abreviacion);
          setPreguntasTema(data.preguntas);
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const handleChangeName = (e) => {
    setTemaName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        process.env.REACT_APP_URL_API + `chane_name_tema`,
        {
          id: id,
          newName: temaName,
        },
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then(({ data }) => {
        toast.success("Nombre actualizado");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const deleteAllPreguntas = () => {
    axios
      .delete(
        process.env.REACT_APP_URL_API + `delete_all_pregunta_temas/` + id,
        {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then(({ data }) => {
        setViewDialog(false);
        setPreguntasTema([]);
        toast.success("Preguntas eliminadas");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const changeFiles = (e) => {
    setFile(e);
    setBase(e.base64.split(",")[1]);
  };

  useEffect(() => {
    if (
      localStorage.getItem("email_penitenciarios") ===
        "Infopulbong@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "avilmor2@gmail.com" ||
      localStorage.getItem("email_penitenciarios") === "toledof764@gmail.com"
    )
      axios
        .get(process.env.REACT_APP_URL_API + `all_tema_data/` + id, {
          headers: {
            authorization: localStorage.getItem("token_penitenciarios"),
          },
        })
        .then(({ data }) => {
          setTemaName(data.tema.name);
          setAbrev(data.tema.abreviacion);
          setPreguntasTema(data.preguntas);
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    else history.push("/");
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="row intro">
            <div className="col-12 col-md-12 align-self-center text-center text-md-left">
              <h2 className="featured">Editar Tema - {abrev}</h2>
            </div>
            <p className="col-12">Nombre:</p>
            <form onSubmit={handleSubmit} className="d-flex">
              <input
                value={temaName}
                name="temaName"
                onChange={handleChangeName}
                className="py-1"
              />
              <button className="w-auto border-0">
                <AiOutlineSend
                  size={25}
                  className="h-100 w-auto p-1"
                  color="#fff"
                  style={{ right: 0, background: "#5A92FA" }}
                />
              </button>
            </form>
          </div>
          <div className="my-4 d-flex justify-content-around">
            <button
              style={{ height: "50px" }}
              type="button"
              onClick={() => setViewDialog(true)}
              className="btn btn-danger"
            >
              Eliminar preguntas
            </button>
            <button
              type="button"
              style={{ height: "50px" }}
              className="btn btn-danger h-max"
            >
              Eliminar Tema
            </button>
            <div>
              <FileBase64 multiple={false} onDone={changeFiles} />
              {file && (
                <div>
                  <label
                    onClick={() => sendFile()}
                    type="button"
                    className="btn primary-button"
                  >
                    Subir Excel
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="col-12">
            {preguntasTema?.map((pregunta, index) => (
              <CardPregunta pregunta={pregunta} key={index} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Dialog
        open={viewDialog}
        onClose={() => setViewDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar preguntas</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div
              className="row"
              style={{
                width: "500px",
              }}
            >
              <div className="col-12 input-group p-0">
                <label>
                  Esto eliminara TODAS las preguntasde del tema{" "}
                  <b style={{ fontWeight: "700px" }}>{temaName}</b>
                </label>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "35%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                className="btn btn-primary"
                onClick={() => setViewDialog(false)}
                color="primary"
              >
                Cancelar
              </Button>
              <Button
                className="btn btn-primary"
                onClick={() => deleteAllPreguntas()}
                color="primary"
                autoFocus
              >
                Aceptar
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditTemas;

function CardPregunta({ pregunta, index }) {
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [urlPageSchema, setUrlPageSchema] = useState("");

  const uploadFile = async (idPregunta) => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("PageLink", urlPageSchema);
      const { data } = await axios.post(
        process.env.REACT_APP_URL_API + `upload_file/${idPregunta}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      );

      setFile(null);
      toast.success("Archivo subido");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const deletePreguntas = (id_pregunta) => {
    axios
      .delete(process.env.REACT_APP_URL_API + `delete_tema/` + id_pregunta, {
        headers: {
          authorization: localStorage.getItem("token_penitenciarios"),
        },
      })
      .then(({ data }) => {
        setVisible(true);
        toast.success("Pregunta eliminada");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const copyId = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => toast.success("Copiado en portapapeles"))
      .catch((error) => toast.success(error));
  };

  return (
    <div className={visible ? "d-none" : "border-bottom"}>
      <div
        className={`d-flex pregunta_Card`}
        style={file ? { background: "#E6E6FA" } : {}}
      >
        <p style={{ width: "84%" }}>
          {" "}
          {index} - {pregunta.pregunta}
        </p>
        <div style={{ width: "16%" }}>
          <div className="d-flex">
            <IoMdCopy
              type="submit"
              onClick={() => copyId(pregunta.id)}
              size={25}
              style={{ width: "50%" }}
            />
            <BsTrash
              type="submit"
              onClick={() => deletePreguntas(pregunta.id)}
              size={25}
              style={{ width: "50%" }}
            />
          </div>

          <div className="d-flex">
            <label
              htmlFor={`selectFile${pregunta.id}`}
              style={{ width: "50%" }}
            >
              <AiOutlineFileAdd
                type="submit"
                size={25}
                style={{ width: "100%" }}
              />
            </label>
            <BiUpload
              type="submit"
              onClick={() => uploadFile(pregunta.id)}
              size={25}
              style={{ width: "50%" }}
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="d-none"
              id={`selectFile${pregunta.id}`}
            />
          </div>
        </div>
      </div>
      <input
        type="text"
        onChange={(e) => setUrlPageSchema(e.target.value)}
        className="border border-0"
        placeholder={`Pagina web de del esquema de la preguna - ${index}`}
      />
    </div>
  );
}
