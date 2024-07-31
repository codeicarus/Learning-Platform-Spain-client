import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { BsTrash } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";
import { TfiNewWindow } from "react-icons/tfi";
import "../Includes/viewSchema.css";
import "./modalSchema.css";
import "./DeleteFiles.css";

function DeleteFilePage() {
  const [files, setFiles] = useState([]);
  const [urlFile, setURLFILE] = useState("");
  const [schema, setSchema] = useState(null);

  const viewSchema = (fileData) => {
    setSchema(fileData);
    setURLFILE(fileData.filepath);
  };

  const deleteSchema = (id) => {
    axios
      .delete(process.env.REACT_APP_URL_API + "delete_file/" + id, {
        headers: {
          Authorization: localStorage.getItem("token_penitenciarios"),
        },
      })
      .then(({ data }) => {
        toast.success("Esquema eliminado con exito");
        setFiles(data.files);
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const deleteFilaAndQuestion = (idQuestin, idSchema) => {
    axios
      .delete(
        process.env.REACT_APP_URL_API +
          "delete_files_question/" +
          idQuestin +
          "/" +
          idSchema,
        {
          headers: {
            Authorization: localStorage.getItem("token_penitenciarios"),
          },
        }
      )
      .then(({ data }) => {
        toast.success("Eliminados con exito");
        setFiles(data.files);
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(process.env.REACT_APP_URL_API + "all_files", {
        headers: {
          Authorization: localStorage.getItem("token_penitenciarios"),
        },
      })
      .then(({ data }) => setFiles(data.files))
      .catch((err) => toast.error(err.response.data.error));
  }, []);
  return (
    <section>
      <div className="container">
        <div className="row intro mt-5 mt-sm-2">
          <div className="col-12">
            <h2 className="featured">Eliminar esquemas</h2>
            <p>
              Aqui podras ver todos los esquemas subidos junto a sus preguntas
            </p>
          </div>
        </div>

        {files?.map((file, index) => {
          // console.log(file.fileData.pagelink);
          return (
            <div key={index} className="Pregunta_schema">
              <div
                className="pregunta"
                dangerouslySetInnerHTML={{
                  __html:
                    "<b style='float:left;margin-right: 5px;'>" +
                    (index + 1) +
                    ". </b>" +
                    file.pregunta.pregunta,
                }}
              ></div>
              <div className="botones">
                <button
                  className="danger-button"
                  onClick={() =>
                    deleteFilaAndQuestion(file.pregunta.id, file.fileData.id)
                  }
                >
                  <AiOutlineWarning size={30} /> Eliminar pregunta y esquema
                </button>
                <button
                  className="btn primary-button"
                  onClick={() => deleteSchema(file.fileData.id)}
                >
                  <BsTrash size={23} /> Eliminar esquema
                </button>
                <button
                  className="btn primary-button"
                  onClick={() => viewSchema(file.fileData)}
                >
                  Ver esquema
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {urlFile.length > 0 ? (
        <ViewSchemaModal set={setURLFILE} schema={schema} />
      ) : null}
    </section>
  );
}

export default DeleteFilePage;

function ViewSchemaModal({ set, schema }) {
  document.querySelector("html").style.overflow = "hidden";

  const closeModal = () => {
    document.querySelector("html").style.overflow = "auto";
    set("");
  };

  const openSchemaPage = (url) => {
    window.open(url, "_blank");
  };

  const ext = schema.filepath.split(".").pop();
  return (
    <div className="viewSchema" style={{ top: "0", display: "block" }}>
      <div className="modal_schema">
        <img className="logo_modal" src="/assets/images/logo.png" />
        <button onClick={closeModal} className="button_close" id="close">
          Cerrar
        </button>
        {schema.pagelink.length > 0 && (
          <span className="open_page_schema">
            <label onClick={() => openSchemaPage(schema.pagelink)}>
              <TfiNewWindow size={20} />
            </label>
          </span>
        )}
        <Carousel className="h-100" interval={99999}>
          {ext == "pdf" ? (
            <Carousel.Item style={{ height: "90%" }}>
              <div className="container-pdf-schema">
                <iframe
                  src={schema.filepath + "#toolbar=0"}
                  id="pdf-view"
                  height={"100%"}
                  frameborder="0"
                ></iframe>
              </div>
            </Carousel.Item>
          ) : (
            <Carousel.Item style={{ textAlign: "center ", height: "87%" }}>
              <div className="container-img-schema">
                <span
                  id="img-view"
                  style={{ backgroundImage: `url(${schema.filepath})` }}
                ></span>
              </div>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    </div>
  );
}
