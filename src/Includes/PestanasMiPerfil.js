import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import MisDatosForm from "./MisDatosForm.js";
import MiPerfilEvolucion from "./MiPerfilEvolucion";
import MiPerfilOficialesSimulacros from "./MiPerfilOficialesSimulacros";
import MiPerfilCasosPracticos from "./MiPerfilCasosPracticos";
import MiPerfilTestTemas from "./MiPerfilTestTemas";
import MiPerfilTestNoTerminados from "./MiPerfilTestNoTerminados";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MiPerfilBasicos from "./MiPerfilBasicos.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function PestanasMiPerfil(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className="for_desktop">
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Evolución" {...a11yProps(0)} />
            <Tab label="Oficiales y Simulacros" {...a11yProps(1)} />
            <Tab label="Casos prácticos" {...a11yProps(2)} />
            <Tab label="Test por temas" {...a11yProps(4)} />
            <Tab label="Test no terminados" {...a11yProps(5)} />
            <Tab label="Mis datos" {...a11yProps(3)} />
            {/* <Tab label="Básicos Confundidos" {...a11yProps(6)} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <MiPerfilEvolucion stats={props.stats} usuario={props.usuario} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MiPerfilOficialesSimulacros
            stats={props.stats}
            usuario={props.usuario}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MiPerfilCasosPracticos stats={props.stats} usuario={props.usuario} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <MiPerfilTestTemas stats={props.stats} usuario={props.usuario} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <MiPerfilTestNoTerminados
            stats={props.stats}
            usuario={props.usuario}
          />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <MisDatosForm usuario={props.usuario} />
        </TabPanel>
        {/* <TabPanel value={value} index={6}>
          <MiPerfilBasicos stats={props.stats} usuario={props.usuario} />
        </TabPanel> */}
      </div>
      <div className="for_mobile">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Evolución</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MiPerfilEvolucion stats={props.stats} usuario={props.usuario} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              Oficiales y Simulacros
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MiPerfilOficialesSimulacros
              stats={props.stats}
              usuario={props.usuario}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Casos Prácticos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MiPerfilCasosPracticos
              stats={props.stats}
              usuario={props.usuario}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Test por temas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MiPerfilTestTemas stats={props.stats} usuario={props.usuario} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              Test no terminados
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MiPerfilTestNoTerminados
              stats={props.stats}
              usuario={props.usuario}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Mis datos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MisDatosForm usuario={props.usuario} />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
