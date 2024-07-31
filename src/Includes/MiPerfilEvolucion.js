import React, {Component} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Chart from "react-google-charts";

class MiPerfilEvolucion extends Component {

    constructor(props) {
        super(props);
    }

    timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = this.str_pad(date+"", 2, "0", "STR_PAD_LEFT") + '/' + this.str_pad((a.getMonth() + 1)+"", 2, "0", "STR_PAD_LEFT") + '/' + year + ' ' + this.str_pad(hour+"", 2, "0", "STR_PAD_LEFT") + ':' + this.str_pad(min+"", 2, "0", "STR_PAD_LEFT") + ':' + this.str_pad(sec+"", 2, "0", "STR_PAD_LEFT");

        return time;
    }

    str_pad(str, pad_length, pad_string, pad_type) {

        var len = pad_length - str.length;

        if (len < 0) return str;

        for (var i = 0; i < len; i++) {

            if (pad_type == "STR_PAD_LEFT") {

                str = pad_string + str;

            } else {

                str += pad_string;

            }

        }

        return str;

    }

    render() {
        const props = this.props
        const data = [];

        data.push(['Examen', 'Nota', { role: 'annotation' }, { role: 'tooltip' }]);

        props.stats.historiales_terminados.forEach((historial, indice, array) => {
            if (historial.tipo == "Test oficiales" || historial.tipo == "Test simulacros") {
                let title_a_poner = "";
                if (historial.tipo == "Test oficiales") {
                    title_a_poner = '<b>' + props.stats.tabla_relacion_oficiales_simulacros[historial.oficiales[0]] + '</b>';
                } else if (historial.tipo == "Test simulacros") {
                    title_a_poner = '<b>' + props.stats.tabla_relacion_oficiales_simulacros[historial.simulacros[0]] + '</b>';
                }
                data.push([
                    (title_a_poner).replace(/(<([^>]+)>)/gi, ""),
                    historial.puntuacion,
                    historial.puntuacion,
                    (this.timeConverter(historial.fecha) + '\n' + historial.tipo + '\n' + title_a_poner + '\n' + historial.puntuacion).replace(/(<([^>]+)>)/gi, "")]);

            }
        });
        if(data.length<=1){
            data.push([
                "",
                0,
                0,
                ""]);
        }

        return (
            <div>
                <div className="row justify-content-center text-center items">
                    <div className="col-12 col-md-12 col-lg-6 item mb-md-4 mb-lg-0 mb-xl-0">
                        <div className="card no-hover">
                            <h4 className="mt-0">Nº de test realizados</h4>
                            <div className="row justify-content-center text-center">
                                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                                    <h3 className="mt-0">{props.stats.stats_n_examenes_simulacros_oficiales}</h3>
                                    Simulacros y oficiales
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 mid_numero_stats">
                                    <h3 className="mt-0">{props.stats.stats_n_examenes_temas_bloques}</h3>
                                    Test por temas y bloques
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-6 item">
                        <div className="card no-hover">
                            <h4 className="mt-0">Nº de preguntas</h4>
                            <div className="row justify-content-center text-center">
                                <div className="col-12 col-md-4 col-lg-4 mid_numero_stats">
                                    <h3 className="mt-0">{props.stats.stats_n_preguntas_acertadas}</h3>
                                    Acertadas
                                </div>
                                <div className="col-12 col-md-4 col-lg-4 mid_numero_stats">
                                    <h3 className="mt-0">{props.stats.stats_n_preguntas_falladas}</h3>
                                    Falladas
                                </div>
                                <div className="col-12 col-md-4 col-lg-4 mid_numero_stats">
                                    <h3 className="mt-0">{props.stats.stats_n_preguntas_blancas}</h3>
                                    Blancas
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card no-hover mt-4 p-4 pt-5">
                    <h4 className="mt-0 text-center">Simulacros y oficiales</h4>
                    <Chart
                        chartType="ColumnChart"
                        height={500}
                        width={'100%'}
                        loader={<div>Cargando</div>}
                        data={data}
                        options={{
                            chartArea: { width: '80%', height: '80%' },
                            hAxis: {
                                minValue: 0
                            },
                            vAxis: {
                                viewWindow: {
                                    max: 150
                                },
                                ticks: [0, 25, 50, 75, 100, 125, 150]
                            },
                            legend: { position: 'none' },
                        }}
                    />
                    {
                        /*


        const Label = ({text, ...props}) => (
            <ValueAxis.Label {...props} text={`${Math.abs(text)}`}/>
        );
                        * <Chart
                        data={data}
                    >
                        <ArgumentAxis />
                        <ValueScale modifyDomain={() => [0, 150]}/>
                        <ValueAxis labelComponent={Label}/>

                        <BarSeries
                            valueField="nota"
                            argumentField="examen"
                            barWidth="0.4"
                            color="#1e50bc"
                        />
                        <Title text="Simulacros y oficiales"/>
                        <Animation/>
                    </Chart>
                        * */
                    }


                </div>
            </div>
        );
    }
}

export default MiPerfilEvolucion;
