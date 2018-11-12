import React from 'react';
import Dropzone from 'react-dropzone';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

//TODO: get this out the str file directly
const demoHandrailFiles = 
(
  '2009_gap_spanner.stl 2022_2024_gap_spanner.stl 2029_36_37_gap_spanner.stl 2339_gap_spanner.stl 2B_5377.stl 2B_5378.stl 2B_5379.stl 2B_5380.stl 4B_5381.stl 4B_5382.stl 4B_5383.stl 4B_5384.stl 5303_gap_spanner.stl 5328_5327_gap_spanner.stl 5328_5335_gap_spanner.stl 5328_5336_gap_spanner.stl 5339_gap_spanner.stl 5341_gap_spanner.stl AL_0500.stl AL_0501.stl AL_0502.stl AL_0503.stl AL_0504.stl AL_0505.stl AL_0506.stl AL_0507.stl AL_0508.stl AL_0509.stl AL_0510.stl AL_0511.stl AL_0512.stl AL_0513.stl AL_0518.stl AL_0519.stl AL_0520.stl AL_0521.stl AL_0522.stl AL_0523.stl AL_0524.stl AL_0525.stl AL_0526.stl AL_0527.stl AL_0528.stl AL_0529.stl AL_0530.stl AL_0531.stl AL_0532.stl AL_0533.stl AL_0534.stl AL_0535.stl AL_0536.stl AL_0537.stl AL_0538.stl AL_0539.stl AL_0540.stl AL_0541.stl AL_0542.stl AL_0543.stl AL_0544.stl AL_0545.stl AL_0546.stl AL_0547.stl AL_0548.stl AL_0549.stl AL_0550.stl AL_0551.stl AL_0552.stl AL_0553.stl AL_0554.stl AL_0555.stl AL_0556.stl AL_0557.stl AL_0558.stl AL_0559.stl AL_0560.stl AL_0561.stl AL_0562.stl AL_0563.stl AL_0564.stl AL_0565.stl AL_0566.stl AL_0567.stl AL_GAP_SPANNER.stl AL_LAB_GAP_SPANNER.stl AL_TOOLBOX_1_H.stl AL_TOOLBOX_2_H.stl AMS_H1.stl AMS_H2.stl AMS_H3.stl AMS_H4.stl AMS_H5.stl AMS_H6.stl AMS_H7.stl AMS_H8.stl AMS_H9.stl CETA_LIGHT_BOOM1H.stl CETA_LIGHT_BOOM2H.stl COL_0900.stl COL_0901.stl COL_0902.stl COL_0903.stl COL_0904.stl COL_0905.stl COL_0906.stl COL_0907.stl COL_0908.stl COL_0909.stl COL_0910.stl COL_0911.stl COL_0912.stl COL_0913.stl COL_0914.stl COL_0915.stl COL_0916.stl COL_0917.stl COL_0918.stl COL_0919.stl COL_0920.stl COL_0921.stl COL_0922.stl COL_0923.stl COL_0924.stl COL_0925.stl COL_0926.stl COL_0927.stl COL_0928.stl COL_0929.stl COL_0930.stl COL_0931.stl COL_0932.stl COL_0933.stl COL_0934.stl COL_0935.stl COL_0936.stl COL_0937.stl COL_0938.stl COL_0939.stl COL_0940.stl COL_0941.stl COL_0942.stl COL_0943.stl COL_0944.stl COL_0945.stl COL_0946.stl COL_0947.stl COL_0948.stl COL_0949.stl COL_0950.stl COL_0951.stl COL_0952.stl COL_0953.stl COL_0954.stl COL_0955.stl COL_0956.stl COL_0957.stl COL_0958.stl DC_3001.stl DC_3002.stl DC_3003.stl DC_3004.stl DC_3005.stl DC_3006.stl DC_3007.stl DC_3008.stl DC_3009.stl DC_3010.stl DC_3011.stl DC_3011_3028_STRAP.stl DC_3012.stl DC_3012_3039_STRAP.stl DC_3013.stl DC_3014.stl DC_3014_3031_STRAP.stl DC_3015.stl DC_3016.stl DC_3017.stl DC_3018.stl DC_3019.stl DC_3020.stl DC_3021.stl DC_3022.stl DC_3023.stl DC_3024.stl DC_3025.stl DC_3026.stl DC_3027.stl DC_3028.stl DC_3029.stl DC_3030.stl DC_3031.stl DC_3032.stl DC_3033.stl DC_3034.stl DC_3035.stl DC_3036.stl DC_3037.stl DC_3038.stl DC_3039.stl DC_3040.stl DC_3041.stl DC_3042.stl DC_3043.stl DC_3044.stl DC_3045.stl DC_3046.stl DC_3047.stl DC_3048.stl ELC1_8501.stl ELC1_8502.stl ELC1_8503.stl ELC1_8504.stl ELC1_8505.stl ELC1_8506.stl ELC1_8507.stl ELC1_8508.stl ELC1_8509.stl ELC1_8510.stl ELC2_8601.stl ELC2_8602.stl ELC2_8603.stl ELC2_8604.stl ELC2_8605.stl ELC2_8606.stl ELC2_8607.stl ELC2_8608.stl ELC2_8609.stl ELC2_8610.stl ELC3_8701.stl ELC3_8702.stl ELC3_8703.stl ELC3_8704.stl ELC3_8705.stl ELC3_8706.stl ELC3_8708.stl ELC3_8709.stl ELC3_8710.stl ELC4_8801.stl ELC4_8802.stl ELC4_8803.stl ELC4_8804.stl ELC4_8805.stl ELC4_8806.stl ELC4_8807.stl ELC4_8808.stl ELC4_8809.stl ELC4_8810.stl ELC4_8811.stl ELC4_8812.stl ELC4_8813.stl ELC4_8814.stl ELC4_8815.stl ESP2_8000.stl ESP2_8001.stl ESP2_8002.stl ESP2_8003.stl ESP2_8004.stl ESP2_8005.stl ESP2_8006.stl ESP2_8007.stl ESP2_8008.stl ESP2_8009.stl ESP2_8010.stl ESP2_8011.stl ESP2_8012.stl ESP2_8013.stl ESP2_8014.stl ESP2_8015.stl ESP2_8016.stl ESP2_8017.stl ESP2_8018.stl ESP2_8019.stl ESP2_8020.stl ESP2_8021.stl ESP2_8022.stl ESP2_8023.stl ESP2_8024.stl ESP2_8025.stl ESP2_8026.stl ESP2_8027.stl ESP2_8028.stl ESP2_8029.stl ESP2_8030.stl ESP2_8031.stl ESP2_8032.stl ESP2_8033.stl ESP2_8034.stl ESP2_8035.stl ESP2_8036.stl ESP3_8301.stl ESP3_8302.stl ESP3_8303.stl ESP3_8304.stl ESP3_8305.stl ESP3_8306.stl ESP3_8307.stl ESP3_8308.stl ESP3_8309.stl ESP3_8310.stl ESP3_8311.stl ESP3_8312.stl ESP3_8313.stl ESP3_8314.stl ESP3_8315.stl ESP3_8316.stl ESP3_8317.stl ESP3_8318.stl ESP3_8319.stl ESP3_8320.stl ESP3_8321.stl ESP3_8322.stl ESP3_8323.stl ESP3_8324.stl ESP3_8325.stl FGB_1010.stl FGB_1011.stl FGB_1012.stl FGB_1013.stl FGB_1020.stl FGB_1030.stl FGB_1031.stl FGB_1032.stl FGB_1033.stl FGB_1035.stl FGB_1036.stl FGB_1037.stl FGB_1038.stl FGB_1050.stl FGB_1060.stl FGB_1061.stl FGB_1062.stl FGB_1063.stl FGB_1064.stl FGB_1065.stl FGB_1070.stl FGB_1071.stl FGB_1072.stl FGB_1073.stl FGB_1074.stl FGB_1075.stl FGB_1076.stl FGB_1077.stl FGB_1078.stl FGB_1079.stl FGB_1200.stl FGB_1201.stl FGB_1202.stl FGB_1203.stl FGB_1204.stl FGB_1300.stl FGB_1301.stl FGB_1302.stl FGB_1303.stl FGB_1304.stl FGB_1305.stl FGB_1306.stl FGB_1307.stl FGB_1308.stl FGB_1309.stl FGB_1310.stl FGB_1311.stl FGB_1312.stl FGB_1313.stl FGB_1314.stl FGB_1315.stl FGB_1316.stl FGB_1320.stl FGB_1321.stl FGB_1322.stl FGB_1323.stl FGB_1324.stl FGB_1325.stl FGB_1326.stl FGB_1327.stl FGB_1328.stl FGB_1329.stl FGB_1330.stl FGB_1331.stl FGB_1332.stl FGB_1333.stl FGB_1334.stl FGB_1335.stl FGB_1350.stl FGB_1360.stl FGB_1400.stl FGB_1401.stl FGB_1402.stl FGB_1403.stl FGB_1404.stl FGB_1500.stl FGB_1501.stl FGB_1502.stl FGB_1503.stl FGB_1504.stl FGB_1505.stl FGB_1506.stl FGB_1507.stl FGB_1508.stl FGB_FL_1036.stl FGB_FL_1079.stl FGB_FL_1310.stl FGB_FL_1316.stl FGB_FL_1330.stl FGB_FL_1350.stl FGB_FL_1500.stl FGB_FL_1502.stl FGB_HANDLES.stl FGB_HR1.stl FGB_HR2.stl FGB_HR3.stl FGB_HR4.stl GAP_SPANNER_2243_ANT.stl GAP_SPANNER_2443_2511.stl GAP_SPAN_0201_0239.stl GAP_SPAN_0219_0232.stl GAP_SPAN_0231_0232.stl GAP_SPAN_0251_0286.stl GAP_SPAN_0288_0259.stl GAP_SPAN_0296_0260.stl GAP_SPAN_ESP2_8013_L0293.stl GAP_SPAN_LAB_NODE2.stl GAP_SPAN_L_N1.stl GAP_SPAN_N1_121122.stl GAP_SPAN_N2_331_344.stl GAP_SPAN_N2_332_345.stl GAP_SPAN_N2_342_347.stl GAP_SPAN_N2_370_372.stl GAP_SPAN_N3_617_618.stl GAP_SPAN_N3_618_619.stl GAP_SPAN_N3_628_618.stl GAP_SPAN_N3_667_to_L_208.stl GAP_SPAN_N3_668_615.stl GAP_SPAN_N3_668_to_N1_112.stl GAP_SPAN_N3_671_to_N1_108.stl GAP_SPAN_N3_673_619.stl GAP_SPAN_N3_673_to_N1_106.stl GAP_SPAN_P1_N1.stl HWY_110.stl HWY_XXX.stl ISS_BSS_0001.stl ISS_BSS_0002.stl ISS_BSS_0003.stl ISS_BSS_0004.stl ISS_BSS_0005.stl ISS_BSS_0006.stl ISS_BSS_0007.stl ISS_BSS_0008.stl ISS_BSS_0009.stl JEF_1219.stl JEF_1220.stl JEF_1221.stl JEF_1222.stl JEF_7000.stl JEF_7001.stl JEF_7002.stl JEF_7003.stl JEF_7004.stl JEF_7005.stl JEF_7006.stl JEF_7007.stl JEF_7008.stl JEF_7009.stl JEF_7010.stl JEF_7011.stl JEF_7012.stl JEF_7013.stl JEF_7014.stl JEF_7015.stl JEF_7016.stl JEF_7017.stl JEF_7018.stl JEF_7019.stl JEF_7020.stl JEF_7021.stl JEF_7022.stl JEF_7023.stl JEF_7024.stl JEF_7025.stl JEF_7026.stl JEF_7027.stl JEF_7028.stl JEF_7029.stl JEF_7030.stl JEF_7031.stl JEF_7032.stl JEF_7033.stl JEF_7034.stl JEF_7035.stl JEF_7036.stl JEF_7037.stl JEF_7038.stl JEF_7039.stl JEF_7040.stl JEF_7041.stl JEF_7042.stl JEF_7043.stl JEF_7044.stl JEF_7045.stl JEF_7046.stl JEF_7047.stl JEF_7048.stl JEF_7049.stl JEF_7050.stl JEF_7051.stl JEF_7052.stl JEF_7053.stl JEF_7054.stl JEF_7055.stl JEF_7056.stl JEF_7057.stl JEF_7058.stl JEF_7059.stl JEF_7060.stl JEF_7061.stl JEF_7062.stl JEF_7063.stl JEF_7064.stl JEF_7065.stl JEF_7066.stl JEF_7067.stl JEF_7068.stl JEF_7069.stl JEF_7070.stl JEF_7071.stl JEF_7072.stl JELM_1225.stl JELM_1226.stl JELM_1227.stl JELM_1228.stl JELM_1229.stl JELM_1230.stl JELM_1231.stl Z1_6000(pool_handle).stl Z1_6001.stl Z1_6002.stl Z1_6003.stl Z1_6004.stl Z1_6005.stl Z1_6006.stl Z1_6007.stl Z1_6008.stl Z1_6009.stl Z1_6010.stl Z1_6011.stl Z1_6012.stl Z1_6013.stl Z1_6014.stl Z1_6015.stl Z1_6016.stl Z1_6017.stl Z1_6018.stl Z1_6019.stl Z1_6020.stl Z1_6021.stl Z1_6022.stl Z1_6023.stl Z1_6024.stl Z1_6025.stl Z1_6026.stl Z1_6027.stl Z1_6028.stl Z1_6029.stl Z1_6030.stl Z1_6031.stl Z1_6032.stl Z1_6033.stl Z1_6034.stl Z1_6035.stl Z1_6036.stl Z1_6037.stl Z1_6038.stl Z1_6039.stl Z1_6040.stl Z1_6041.stl Z1_6042.stl Z1_6043.stl Z1_6044.stl Z1_6045.stl Z1_6046.stl Z1_6047.stl Z1_6048.stl Z1_6049.stl Z1_6050.stl Z1_6051.stl Z1_6052.stl Z1_6053.stl Z1_6054.stl Z1_6055.stl Z1_6056.stl Z1_6057.stl Z1_6058.stl Z1_6059.stl Z1_6060.stl Z1_6061.stl Z1_6062.stl Z1_GE1.stl Z1_GE2.stl zh36.stl zh37.stl' 
).split(' ');

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.defaultRoutes = props.routes;
    this.state = {
      stationFile: null,
      stationError: '',
      stationLoading: false,
      handrailFiles: [],
      handrailError: '',
      handrailLoading: false,
      strFiles: [],
    };
    this.handleStationFileDrop = this.handleStationFileDrop.bind(this);
    this.handleStationFileRejected = this.handleStationFileRejected.bind(this);
    this.handleHandrailFilesDrop = this.handleHandrailFilesDrop.bind(this);
    this.handleStrFilesDrop = this.handleStrFilesDrop.bind(this);
    this.createHandrailOptions = this.createHandrailOptions.bind(this);
    this.submit = this.submit.bind(this);
    this.secondSubmit = this.secondSubmit.bind(this);
    this.changeSelectedTabIndex = this.changeSelectedTabIndex.bind(this);
  }
  
  componentDidMount() {
    const {onStationFileLoad, onHandrailFilesLoad, onStrFilesLoad} = this.props;
    const fileName = './models/Handrails/stage_55-6_v12_nohandles_binary.stl';
    const handrailDataFiles = {};
    const handrailFiles = [];
    const strFiles = [];
    
    // load a default stationFile for demo purposes
    this.setState({
      stationFile: {
        name: fileName,
        size: 178422000
      },
      stationLoading: true,
      handrailLoading: false,
    });

    fetch(fileName)
      .then(response => response.arrayBuffer())
      .then(data => {
        onStationFileLoad(data);
        this.setState({stationLoading: false, });
      });

    demoHandrailFiles.forEach(handrailFile => {
      fetch(`./models/Handrails/frames/${handrailFile}`)
        .then(response => response.arrayBuffer())
        .then(data => {
          handrailDataFiles[handrailFile] = data;
          handrailFiles.push({name: handrailFile});
          if (Object.keys(handrailDataFiles).length == demoHandrailFiles.length) {
            onHandrailFilesLoad(handrailDataFiles);
            this.setState({
              handrailLoading: false,
              handrailFiles,
            });
          }
        });
    });

    fetch('./models/Handrails/Entire_ISS.str')
      .then(response => response.text())
      .then(data => {
        strFiles.push(data);
        onStrFilesLoad(strFiles)
      });
  }

  handleStationFileDrop(acceptedFiles) {
    const {
      onStationFileLoad
    } = this.props;
    acceptedFiles.forEach(stationFile => {
      this.setState({stationError: ''});
      const reader = new FileReader();
      reader.onabort = () => console.warn('stationFile reading was aborted');
      reader.onerror = () => console.warn('stationFile reading has failed');
      reader.onloadstart = () => this.setState({stationLoading: true});
      reader.onloadend = () => {
        onStationFileLoad(reader.result);
        this.setState({
          stationFile,
          stationLoading: false
        });
      };

      reader.readAsBinaryString(stationFile);
    });
  }

  handleStationFileRejected() {
    this.setState({stationError: 'Can only accept stl files'});
  }

  handleHandrailFilesDrop(files) {
    const {onHandrailFilesLoad} = this.props;
    const {handrailLoading, handrailFiles} = this.state;
    const handrailResults = {};
    files.forEach((handrailFile, i) => {
      this.setState({handrailError: ''});
      const reader = new FileReader();
      reader.onabort = () => console.warn('handrailFile reading was aborted');
      reader.onerror = () => console.warn('handrailFile reading has failed');
      reader.onloadstart = () => {
        if (!handrailLoading) {
          this.setState({handrailLoading: true});
        }
      };
      reader.onloadend = () => {
        handrailFiles.push(handrailFile);
        handrailResults[handrailFile.name] = reader.result;
        if (i === files.length - 1) {
          this.setState({
            handrailFiles,
            handrailLoading: false
          });
          onHandrailFilesLoad(handrailResults);
        }
      };

      reader.readAsBinaryString(handrailFile);
    });
  }

  handleStrFilesDrop(files) {
    const {onStrFilesLoad} = this.props;
    const strResults = [];
    files.forEach((handrailFile, i) => {
      const reader = new FileReader();
      reader.onabort = () => console.warn('handrailFile reading was aborted');
      reader.onerror = () => console.warn('handrailFile reading has failed');
      reader.onloadend = () => {
        strResults.push(reader.result);
        if (i === files.length - 1) {
          this.setState({
            strFiles: files,
          });
          onStrFilesLoad(strResults);
        }
      };

      reader.readAsBinaryString(handrailFile);
    });
  }

  changeSelectedTabIndex(tab)  {
   
   this.props.onCrewTabChange(tab);
  }

  createHandrailOptions() {
    return this.state.handrailFiles.map(file => ({
      value: file.name.replace(/\.stl$/, ''),
      label: file.name.replace(/\.stl$/, '')      
    }));
  }

  submit() {
    const {
      startHandrail,
      endHandrail,
      wingspan,
    } = this.props;
    this.props.onSubmit({
      startHandrail,
      endHandrail,
      wingspan,
    });
  }

  secondSubmit() {
    //debugger;
    const {
      startHandrailSecond,
      endHandrailSecond,
      wingspanSecond,
    } = this.props;
    this.props.onSecondSumbit({
      startHandrailSecond,
      endHandrailSecond,
      wingspanSecond,
    });
  }

  render() {
    const {
      stationFile,
      stationError,
      stationLoading,
      handrailFiles,
      handrailError,
      handrailLoading,
      strFiles,
    } = this.state;
    const {
      startHandrail,
      endHandrail,
      startHandrailSecond,
      endHandrailSecond,
      onStartEndHandrailsChange,
      //onSecondStartEndHandrailsChange,
      onRoutesChange,
      onSecondRoutesChange,
      onReset,
      wingspan,
      wingspanSecond,
      visibleRoutes,
      visibleRoutesSecond,
      onWingspanChange,
      onSecondWingspanChange,
      } = this.props;
    return (
      <div className='Controls'>
        <Tabs>
          <TabList>
            <Tab>Controls</Tab>
            <Tab>Upload Files</Tab>
            <Tab>Path Results</Tab>
          </TabList>
          <TabPanel>
            <Tabs forceRenderTabPanel>
              <TabList>
             <Tab onClick={this.changeSelectedTabIndex.bind(this,'CrewOne')} >Crew Member 1</Tab>
             <Tab onClick={this.changeSelectedTabIndex.bind(this, 'CrewTwo')} >Crew Member 2</Tab> 
              </TabList>
                <TabPanel>
                  <div className='handrails-selector'>
                    <Select
                      name='startHandrail'
                      placeholder='Select start handrail...'
                      value={startHandrail}
                      options={this.createHandrailOptions()}
                      onChange={option => onStartEndHandrailsChange('start', option, false, 1)}
                    />
                    <Select
                      name='endHandrail'
                      placeholder='Select end handrail...'
                      value={endHandrail}
                      options={this.createHandrailOptions()}
                      onChange={option => onStartEndHandrailsChange('end', option, false, 1)}
                    />
                  </div>
                  <div className='wingspan-control'>
                    Wingspan: {wingspan} ft
                    <Slider value={wingspan}
                      onChange={onWingspanChange}
                      min={4}
                      max={7}
                      marks={{
                        4: '4 ft',
                        5: '5 ft',
                        6: '6 ft',
                        7: '7 ft'
                      }}
                    />
                  <br />
                  </div>
                <div className='route-select-control'>
                    <strong>Visible Paths</strong>
                    <CheckboxGroup className='route-select-container' name="routes" value={visibleRoutes} onChange={onRoutesChange}>
                      {this.defaultRoutes.map(route => (
                        <label style={{borderBottom: `${route.color} 5px solid`}} key={route.value}>
                          <Checkbox value={route.value} />
                          Route {route.value}
                        </label>
                      ))}
                    </CheckboxGroup>
                  </div>
                  <div className='action-control'>
                    <button className='button-primary' onClick={this.submit}>Go</button>
                    <button className='button-primary' onClick={onReset}>Reset</button>
                  </div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </TabPanel>
                <TabPanel>
                  <div className='handrails-selector'>
                    <Select
                      name='startHandrail'
                      placeholder='Select start handrail...'
                      value={startHandrailSecond}
                      options={this.createHandrailOptions()}
                      onChange={option => onStartEndHandrailsChange('start', option, false, 2)}
                    />
                    <Select
                      name='endHandrail'
                      placeholder='Select end handrail...'
                      value={endHandrailSecond}
                      options={this.createHandrailOptions()}
                      onChange={option => onStartEndHandrailsChange('end', option, false, 2)}
                    />
                  </div>
                  <div className='wingspan-control'>
                    Wingspan: {wingspanSecond} ft
                    <Slider value={wingspanSecond}
                      onChange={onSecondWingspanChange}
                      min={4}
                      max={7}
                      marks={{
                        4: '4 ft',
                        5: '5 ft',
                        6: '6 ft',
                        7: '7 ft'
                      }}
                    />
                  <br />
                  </div>
                <div className='route-select-control'>
                    <strong>Visible Paths</strong>
                    <CheckboxGroup className='route-select-container' name="routes" value={visibleRoutesSecond} onChange={onSecondRoutesChange}>
                      {this.defaultRoutes.map(route => (
                        <label style={{borderBottom: `${route.color} 5px solid`}} key={route.value}>
                          <Checkbox value={route.value} />
                          Route {route.value}
                        </label>
                      ))}
                    </CheckboxGroup>
                  </div>
                  <div className='action-control'>
                    <button className='button-primary' onClick={this.secondSubmit}>Go</button>
                    <button className='button-primary' onClick={onReset}>Reset</button>
                  </div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </TabPanel>
            </Tabs>
          </TabPanel> 
          <TabPanel>
            <div className='file-controls'>
              <div className='station-controls'>
                <p>Drag & drop or click to upload <br /> the station stl file to render...</p>
                {stationLoading && <div style={{color: 'blue'}}>Station model is loading, this might take a while...</div>}
                <Dropzone
                  className="drop-upload"
                  onDrop={this.handleStationFileDrop}
                  multiple={false}
                  onDropRejected={this.handleStationFileRejected}
                  accept='.stl'
                >
                  <div style={{color: 'red'}}>{stationError}</div>
                  {stationFile &&
                    <div>{stationFile.name} - {stationFile.size} bytes</div>
                  }
                </Dropzone>
              </div>
              <div className='handrails-controls'>
                <p>Drag & drop or click to upload <br /> the handrail stl files to render...</p>
                {handrailLoading && <div style={{color: 'blue'}}>Handrail models are loading, this might take a while...</div>}
                <Dropzone
                  className="drop-upload"
                  onDrop={this.handleHandrailFilesDrop}
                  onDropRejected={this.handleHandrailFilesRejected}
                  accept='.stl'
                >
                  <div style={{color: 'red'}}>{handrailError}</div>
                  {handrailFiles.length > 0 &&
                    <div>{handrailFiles.length} handrails loaded</div>
                  }
                </Dropzone>
              </div>
              <div className='str-controls'>
                <p>Drag & drop or click to upload <br /> one or more str files to position the handrails...</p>
                <Dropzone
                  className="drop-upload"
                  onDrop={this.handleStrFilesDrop}
                  accept='.str'
                >
                  {strFiles.map(strFile =>
                    <div key={strFile.name}>{strFile.name}</div>
                  )}
                </Dropzone>
              </div>
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
          </TabPanel>
          <TabPanel>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

Controls.propTypes = {
  onStationFileLoad: PropTypes.func.isRequired,
  onHandrailFilesLoad: PropTypes.func.isRequired,
  onStrFilesLoad: PropTypes.func.isRequired,
  onStartEndHandrailsChange: PropTypes.func.isRequired,
  //onSecondStartEndHandrailsChange: PropTypes.func.isRequired,
  startHandrail: PropTypes.string,							// PHASE 3 MOD Lincoln Powell/lpowell25@student.umuc.edu 8/3/2018 Changed startHandrail PropType from object to string
  startHandrailSecond: PropTypes.string,
  endHandrail: PropTypes.string,							// PHASE 3 MOD Lincoln Powell/lpowell25@student.umuc.edu 8/3/2018 Changed endHandrail PropType from object to string
  endHandrailSecond: PropTypes.string,
  routes: PropTypes.array.isRequired,
  routesSecond: PropTypes.array.isRequired,
  visibleRoutes: PropTypes.array.isRequired,
  visibleRoutesSecond: PropTypes.array.isRequired,
  onReset: PropTypes.func.isRequired,
  onWingspanChange: PropTypes.func.isRequired,
  onSecondWingspanChange: PropTypes.func.isRequired,
  onRoutesChange: PropTypes.func.isRequired,
  onSecondRoutesChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSecondSumbit: PropTypes.func.isRequired,
  wingspan: PropTypes.number.isRequired,
  wingspanSecond: PropTypes.number.isRequired,
  onCrewTabChange : PropTypes.func.isRequired
};