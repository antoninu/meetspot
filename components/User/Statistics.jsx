import React, { useEffect, useState } from 'react';
import useStateValue from 'hooks/useStateValue';
import * as d3 from 'd3';
import { Center } from '@chakra-ui/react';
import fetcher from 'utils/fetcher';
function Statistics(props) {
  const [{ user }] = useStateValue();
  const [eventosSinFecha, setEventosSinFecha] = useState([]);

  const getEvents = async () => {
    if (navigator.onLine) {
      const response = await fetcher(
        `usuarios/${user._id}/eventosFuturos`,
        'GET',
      );
      if (response.error) {
        setError(response.error);
      } else {
        let events = response.map((element) => {
          let elemento = {};
          elemento.start = new Date(element.start);
          elemento.end = new Date(element.end);
          elemento.title = element.title;
          elemento.id = element.id;
          elemento.desc = element.descripcion;
          return elemento;
        });
        localStorage.setItem('events', JSON.stringify(events));
        setEventosSinFecha(events);
      }
    } else {
      if (localStorage.getItem('events') === null) {
        setEventosSinFecha([]);
        setEventos([]);
      } else {
        const storedEvents = JSON.parse(localStorage.getItem('events')).map(
          (element) => {
            let elemento = {};
            elemento.start = new Date(element.start);
            elemento.end = new Date(element.end);
            elemento.title = element.title;
            elemento.id = element.id;
            elemento.desc = element.descripcion;
            return elemento;
          },
        );
        setEventosSinFecha(storedEvents);
      }
    }
  };

  const graph = () => {
    const width = 800;
    const height = 600;

    // Creates sources <svg> element
    const svg = d3
      .select('#canvas')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    var minutosDisponibles = 1440;
    var minutosOcupados = 0;
    var hoy = new Date();
    var startD = new Date();
    var finD = new Date();
    hoy.setHours(0, 0, 0, 0);

    for (let i = 0; i < eventosSinFecha.length; i++) {
      const element = eventosSinFecha[i];

      startD = new Date(element.start.getTime());
      finD = new Date(element.end.getTime());

      startD.setHours(0, 0, 0, 0);
      finD.setHours(0, 0, 0, 0);

      if (startD.getTime() == hoy.getTime()) {
        var diff =
          (eventosSinFecha[i].end.getTime() -
            eventosSinFecha[i].start.getTime()) /
          1000;
        diff /= 60;
        minutosOcupados += Math.abs(Math.round(diff));
        minutosDisponibles -= minutosOcupados;
      }
    }

    const data = [minutosOcupados, minutosDisponibles]; //eventos.filter(evento => evento.);

    console.log(data);

    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3.pie();

    const pied_data = pie(data);

    const arcs = g
      .selectAll('.arc')
      .data(pied_data)
      .join((enter) =>
        enter.append('path').attr('class', 'arc').style('stroke', 'white'),
      );

    arcs.attr('d', arc).style('fill', (d, i) => color(i));
  };

  useEffect(() => {
    if (user !== null && eventosSinFecha.length == 0) {
      getEvents();
    }
    //graph()
    if (eventosSinFecha.length > 0) {
      console.log(eventosSinFecha);
      graph();
    }
  }, [eventosSinFecha]);

  return (
    <Center>
      <h2>Tiempo disponible hoy</h2>
      <br/>
      <div id="canvas"></div>
    </Center>
  );
}

export default Statistics;
