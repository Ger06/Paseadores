import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addImage,
  clientSendOrden,
  getOrdenCliente,
  getPaseadorForId,
  postAssessment,
  getAssessment
} from "../../actions/index";

import style from "./PerfilWalker.module.css";
import foto1 from "../../media/foto1Service.jpg";
import { Link, useParams, useHistory } from "react-router-dom";
import Nav from "./nav/Nav";

import FullCalendar, { EventContentArg } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import momentPlugin from "@fullcalendar/moment";
import moment from "moment";
import Swal from 'sweetalert2'
import patitallena from '../../media/patitallena.png'
import patitavacia from '../../media/patitavacia.png'
import mediapatita from '../../media/mediapatita.png'


const PerfilWalker = () => {
  const { id } = useParams();
  var idClient = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const history = useHistory();

  const Walker = useSelector((state) => state.detailWalker);
  const comment = useSelector((state) => state.comment);
    const score = useSelector((state) => state.score);

  const ordensCliente = useSelector((state) => state.ordensCliente);

  var idCliente = localStorage.getItem("userId");

  const [ordenload, setOrdenLoad] = useState(false);

  const [input, setInput] = useState({
    score: 0,
    comment: '' })

    const inputChange = (e) => {
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })
  }


  useEffect(() => {
    dispatch(getPaseadorForId(id));
    dispatch(getAssessment(id))
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrdenCliente(id));
  }, [dispatch]);
  // const [file, setFile] = useState('')
  // const handleInputChange = (e) => {
  //     setFile(e.target.files[0])
  // };

  // const handleSubmitImage = (e) => {
  //     e.preventDefault();
  //     if (!file) return;
  //     console.log('file', file)
  //     // upLoadImage(previewSource)
  //     addImage(file)
  // }

  // const handleLogout = (event) => {
  //     event.preventDefault();
  //     history.push("/");
  // };

  useEffect(() => {
    if (ordenload === true) {
      dispatch(getOrdenCliente(id));
    }
  }, [ordenload]);

  const  handlerSubmit = async (e) => {
    e.preventDefault();
    await dispatch(postAssessment({...input, idUser:id, idClient:idClient}))
    dispatch(getAssessment(id))
    //dispatch(putDetailsProfileCliente(id, input))
    
    Swal.fire({
        icon: 'success',
        title: 'Tu valoración fue enviada',
        showConfirmButton: false,
        timer: 1500
        
      })
    
   // history.push(`/Cliente/${id}`)

}

async function  estrella(e, number) {
  setInput({
      ...input,
      score: number
  })
}

  const maxPerrosPorTurno = 4;

  const handleDateSelect = (selectInfo) => {
    let today = new Date();

    var calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (selectInfo.start < today) {
      calendarApi.unselect();
      return alert("Fecha no permitida");
    }
    const cantOrdenes = ordensCliente.filter(
      (ordens) =>
        ordens.start.toString() === selectInfo.startStr.toString() &&
        ordens.end.toString() === selectInfo.endStr.toString()
    );

    if (cantOrdenes.length >= maxPerrosPorTurno) {
      return alert("No hay disponibilidad horaria en este turno");
    }

    if (selectInfo.start >= today) {
      var title = prompt(
        `Confirma reserva con ${Walker.name}? agregue ubicación`
      );
      calendarApi.addEvent(
        {
          // will render immediately. will call handleEventAdd
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          // allDay: selectInfo.allDay
        },
        true
      ); // temporary=true, will get overwritten when reducer gives new events
    }
    if (title) {
      dispatch(
        clientSendOrden({
          fechaInicio: selectInfo.startStr,
          fechaFinal: selectInfo.endStr,
          userId: id,
          clientId: idCliente,
          ubicacion: title,
        })
      );
      console.log(ordenload);
      setTimeout(() => {
        setOrdenLoad(true);
      }, 1000);

      setTimeout(() => {
        setOrdenLoad(false);
      }, 1000);
    }
  };

  // const handleEventClick = (clickInfo) => {
  //     console.log(clickInfo)
  //     if ((`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //       clickInfo.event.remove() // will render immediately. will call handleEventRemove
  //     }
  //   }
  const handleEventClick = (clickInfo) => {
    if (clickInfo.event.extendedProps.clientId === idCliente) {
      clickInfo.event.remove(); // will render immediately. will call handleEventRemove
    } else {
      return clickInfo.event.title; // will render immediately. will call handleEventRemove
    }
  };

  var mañana = false;
  var tarde = false;

  return (
    <div className={style.container}>
      <Nav />

      <div className={style.containerPerfil}>
        <div className={style.personalInformation}>
          <div className={style.borderFoto}>
            <div className={style.fotoPerfil}>
              {Walker.image ? (
                <img src={Walker.image} alt="" />
              ) : (
                <img
                  src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className={style.informacion}>
            {Walker.status === "active" ? (
              <p className={style.activo}>Disponible</p>
            ) : (
              ""
            )}
            {Walker.status === "inactive" ? (
              <p className={style.noactivo}>No disponible</p>
            ) : (
              ""
            )}
            {Walker.status === "removed" ? (
              <p className={style.noactivo}>Este usuario ya no existe</p>
            ) : (
              ""
            )}
            <ul>
              <li className={style.liService}>{Walker.service}</li>
              <li className={style.liUbication}>{Walker.ubication}</li>
            </ul>
          </div>
        </div>
        <div className={style.caracteristicas}>
          <div className={style.descripcion}>
            <h2>Descripción</h2>
            <div className={style.textDescription}>
              {Walker.description ? (
                <p className={style.textDescriptionNew}>{Walker.description}</p>
              ) : (
                <p>Agrega una descripcion</p>
              )}
            </div>
          </div>
          <div>
            <span>🟢 Paseos Confirmados</span>
            <span>🟡 Pendientes</span>
          </div>
          <div>
            <FullCalendar
              eventClassNames={style.calendar}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="timeGridWeek"
              locale={esLocale}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={3}
              select={handleDateSelect}
              eventClick={handleEventClick}
              contentHeight="auto"
              slotDuration="01:00"
              events={ordensCliente}
              slotMinTime={tarde ? "13:00:00" : "06:00:00"}
              slotMaxTime={mañana ? "13:00:00" : "23:00:00"}
              allDaySlot={false}
            />
          </div>
          <div className={style.price}>
            <h2>Precio</h2>
            <div className={style.textDescription}>
              {Walker.price != 0 ? (
                <p>{Walker.price} x Hour</p>
              ) : (
                <p>Ponle un precio a tu servicio</p>
              )}
            </div>
          </div>
          <div className={style.reputacion}>
                        <h2>Reputación</h2>
                        <div className={style.textDescription}>
                            <h1>{score?.toFixed(1)}</h1>
                        <img src={patitallena}  alt=''/>
                        {score < 1 && <img src={patitavacia} alt='sas' />}
                        {score > 1 && score <2 && <img src={mediapatita}  alt=''/> }
                        {score >= 2 &&<img src={patitallena}  alt=''/>}  
                        {score < 2 && <img src={patitavacia} alt='sas' />}
                        {score > 2 && score <3 && <img src={mediapatita}  alt=''/> }
                        {score >= 3 && <img src={patitallena}  alt=''/> }
                        {score < 3 && <img src={patitavacia} alt='sas' />}
                        {score > 3 && score <4 && <img src={mediapatita}  alt=''/> }
                        {score >= 4  &&<img src={patitallena}  alt=''/> }
                        {score < 4 && <img src={patitavacia} alt='sas' />}
                        {score > 4 && score <5 && <img src={mediapatita}  alt=''/> }
                        {score === 5 && <img src={patitallena}  alt=''/> }
                        {score < 5 && <img src={patitavacia} alt='sas' />}

                            </div>
                            {comment?.length &&  
            comment.map((el) => <div><p> {el}</p></div>
            )}
                        
                        <button className={style.prueba} onClick={e => { estrella(e,1) }}>
                        {input.score > 0  ?<img src={patitallena}  alt=''/>  : <img src={patitavacia} alt='sas' />}
                        </button>
                        <button className={style.prueba} onClick={e => { estrella(e,2) }}>
                        {input.score > 1  ?<img src={patitallena}  alt=''/>  : <img src={patitavacia} alt='sas' />}
                        </button>
                        <button className={style.prueba} onClick={e => { estrella(e,3) }}>
                        {input.score > 2  ?<img src={patitallena}  alt=''/>  : <img src={patitavacia} alt='sas' />}
                        </button>
                        <button className={style.prueba} onClick={e => { estrella(e,4) }}>
                        {input.score > 3  ?<img src={patitallena}  alt=''/>  : <img src={patitavacia} alt='sas' />}
                        </button>
                        <button className={style.prueba} onClick={e => { estrella(e,5) }}>
                        {input.score > 4  ?<img src={patitallena}  alt=''/>  : <img src={patitavacia} alt='sas' />}
                        </button>
                      
                        <form className={style.formulario} onSubmit={handlerSubmit}>
                        <textarea
                    type='text'
                    name='comment'
                    value={input.comment}
                    placeholder='Dejar un comentario...'
                    onChange={e => inputChange(e)} />
                    <div className={style.containerBtn}>
                    <button className={style.edit} type='submit'>Enviar</button>
                </div>
            </form>
            
                </div>
          <div className={style.fotos}>
            <div className={style.fondoFotos}>
              <h2>Fotos</h2>
              <div className={style.galeria}>
                {Walker.images?.map((i) => (
                  <div key={i.public_id}>
                    <img src={i.imageURL ? i.imageURL : foto1} alt="a" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PerfilWalker;
