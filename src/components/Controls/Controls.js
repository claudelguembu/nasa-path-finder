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
 '2009_gap_spanner.stl 2022_2024_gap_spanner.stl 2029_36_37_gap_spanner.stl 2339_gap_spanner.stl 2B_5377.stl 2B_5378.stl 2B_5379.stl 2B_5380.stl 4B_5381.stl 4B_5382.stl 4B_5383.stl 4B_5384.stl 5303_gap_spanner.stl 5328_5327_gap_spanner.stl 5328_5335_gap_spanner.stl 5328_5336_gap_spanner.stl 5339_gap_spanner.stl 5341_gap_spanner.stl AL_0500.stl AL_0501.stl AL_0502.stl AL_0503.stl AL_0504.stl AL_0505.stl AL_0506.stl AL_0507.stl AL_0508.stl AL_0509.stl AL_0510.stl AL_0511.stl AL_0512.stl AL_0513.stl AL_0518.stl AL_0519.stl AL_0520.stl AL_0521.stl AL_0522.stl AL_0523.stl AL_0524.stl AL_0525.stl AL_0526.stl AL_0527.stl AL_0528.stl AL_0529.stl AL_0530.stl AL_0531.stl AL_0532.stl AL_0533.stl AL_0534.stl AL_0535.stl AL_0536.stl AL_0537.stl AL_0538.stl AL_0539.stl AL_0540.stl AL_0541.stl AL_0542.stl AL_0543.stl AL_0544.stl AL_0545.stl AL_0546.stl AL_0547.stl AL_0548.stl AL_0549.stl AL_0550.stl AL_0551.stl AL_0552.stl AL_0553.stl AL_0554.stl AL_0555.stl AL_0556.stl AL_0557.stl AL_0558.stl AL_0559.stl AL_0560.stl AL_0561.stl AL_0562.stl AL_0563.stl AL_0564.stl AL_0565.stl AL_0566.stl AL_0567.stl AL_GAP_SPANNER.stl AL_LAB_GAP_SPANNER.stl AL_TOOLBOX_1_H.stl AL_TOOLBOX_2_H.stl AMS_H1.stl AMS_H2.stl AMS_H3.stl AMS_H4.stl AMS_H5.stl AMS_H6.stl AMS_H7.stl AMS_H8.stl AMS_H9.stl CETA_LIGHT_BOOM1H.stl CETA_LIGHT_BOOM2H.stl COL_0900.stl COL_0901.stl COL_0902.stl COL_0903.stl COL_0904.stl COL_0905.stl COL_0906.stl COL_0907.stl COL_0908.stl COL_0909.stl COL_0910.stl COL_0911.stl COL_0912.stl COL_0913.stl COL_0914.stl COL_0915.stl COL_0916.stl COL_0917.stl COL_0918.stl COL_0919.stl COL_0920.stl COL_0921.stl COL_0922.stl COL_0923.stl COL_0924.stl COL_0925.stl COL_0926.stl COL_0927.stl COL_0928.stl COL_0929.stl COL_0930.stl COL_0931.stl COL_0932.stl COL_0933.stl COL_0934.stl COL_0935.stl COL_0936.stl COL_0937.stl COL_0938.stl COL_0939.stl COL_0940.stl COL_0941.stl COL_0942.stl COL_0943.stl COL_0944.stl COL_0945.stl COL_0946.stl COL_0947.stl COL_0948.stl COL_0949.stl COL_0950.stl COL_0951.stl COL_0952.stl COL_0953.stl COL_0954.stl COL_0955.stl COL_0956.stl COL_0957.stl COL_0958.stl DC_3001.stl DC_3002.stl DC_3003.stl DC_3004.stl DC_3005.stl DC_3006.stl DC_3007.stl DC_3008.stl DC_3009.stl DC_3010.stl DC_3011.stl DC_3011_3028_STRAP.stl DC_3012.stl DC_3012_3039_STRAP.stl DC_3013.stl DC_3014.stl DC_3014_3031_STRAP.stl DC_3015.stl DC_3016.stl DC_3017.stl DC_3018.stl DC_3019.stl DC_3020.stl DC_3021.stl DC_3022.stl DC_3023.stl DC_3024.stl DC_3025.stl DC_3026.stl DC_3027.stl DC_3028.stl DC_3029.stl DC_3030.stl DC_3031.stl DC_3032.stl DC_3033.stl DC_3034.stl DC_3035.stl DC_3036.stl DC_3037.stl DC_3038.stl DC_3039.stl DC_3040.stl DC_3041.stl DC_3042.stl DC_3043.stl DC_3044.stl DC_3045.stl DC_3046.stl DC_3047.stl DC_3048.stl ELC1_8501.stl ELC1_8502.stl ELC1_8503.stl ELC1_8504.stl ELC1_8505.stl ELC1_8506.stl ELC1_8507.stl ELC1_8508.stl ELC1_8509.stl ELC1_8510.stl ELC2_8601.stl ELC2_8602.stl ELC2_8603.stl ELC2_8604.stl ELC2_8605.stl ELC2_8606.stl ELC2_8607.stl ELC2_8608.stl ELC2_8609.stl ELC2_8610.stl ELC3_8701.stl ELC3_8702.stl ELC3_8703.stl ELC3_8704.stl ELC3_8705.stl ELC3_8706.stl ELC3_8708.stl ELC3_8709.stl ELC3_8710.stl ELC4_8801.stl ELC4_8802.stl ELC4_8803.stl ELC4_8804.stl'
+ ' ELC4_8805.stl ELC4_8806.stl ELC4_8807.stl ELC4_8808.stl ELC4_8809.stl ELC4_8810.stl ELC4_8811.stl ELC4_8812.stl ELC4_8813.stl ELC4_8814.stl ELC4_8815.stl ESP2_8000.stl ESP2_8001.stl ESP2_8002.stl ESP2_8003.stl ESP2_8004.stl ESP2_8005.stl ESP2_8006.stl ESP2_8007.stl ESP2_8008.stl ESP2_8009.stl ESP2_8010.stl ESP2_8011.stl ESP2_8012.stl ESP2_8013.stl ESP2_8014.stl ESP2_8015.stl ESP2_8016.stl ESP2_8017.stl ESP2_8018.stl ESP2_8019.stl ESP2_8020.stl ESP2_8021.stl ESP2_8022.stl ESP2_8023.stl ESP2_8024.stl ESP2_8025.stl ESP2_8026.stl ESP2_8027.stl ESP2_8028.stl ESP2_8029.stl ESP2_8030.stl ESP2_8031.stl ESP2_8032.stl ESP2_8033.stl ESP2_8034.stl ESP2_8035.stl ESP2_8036.stl ESP3_8301.stl ESP3_8302.stl ESP3_8303.stl ESP3_8304.stl ESP3_8305.stl ESP3_8306.stl ESP3_8307.stl ESP3_8308.stl ESP3_8309.stl ESP3_8310.stl ESP3_8311.stl ESP3_8312.stl ESP3_8313.stl ESP3_8314.stl ESP3_8315.stl ESP3_8316.stl ESP3_8317.stl ESP3_8318.stl ESP3_8319.stl ESP3_8320.stl ESP3_8321.stl ESP3_8322.stl ESP3_8323.stl ESP3_8324.stl ESP3_8325.stl FGB_1010.stl FGB_1011.stl FGB_1012.stl FGB_1013.stl FGB_1020.stl FGB_1030.stl FGB_1031.stl FGB_1032.stl FGB_1033.stl FGB_1035.stl FGB_1036.stl FGB_1037.stl FGB_1038.stl FGB_1050.stl FGB_1060.stl FGB_1061.stl FGB_1062.stl FGB_1063.stl FGB_1064.stl FGB_1065.stl FGB_1070.stl FGB_1071.stl FGB_1072.stl FGB_1073.stl FGB_1074.stl FGB_1075.stl FGB_1076.stl FGB_1077.stl FGB_1078.stl FGB_1079.stl FGB_1200.stl FGB_1201.stl FGB_1202.stl FGB_1203.stl FGB_1204.stl FGB_1300.stl FGB_1301.stl FGB_1302.stl FGB_1303.stl FGB_1304.stl FGB_1305.stl FGB_1306.stl FGB_1307.stl FGB_1308.stl FGB_1309.stl FGB_1310.stl FGB_1311.stl FGB_1312.stl FGB_1313.stl FGB_1314.stl FGB_1315.stl FGB_1316.stl FGB_1320.stl FGB_1321.stl FGB_1322.stl FGB_1323.stl FGB_1324.stl FGB_1325.stl FGB_1326.stl FGB_1327.stl FGB_1328.stl FGB_1329.stl FGB_1330.stl FGB_1331.stl FGB_1332.stl FGB_1333.stl FGB_1334.stl FGB_1335.stl FGB_1350.stl FGB_1360.stl FGB_1400.stl FGB_1401.stl FGB_1402.stl FGB_1403.stl FGB_1404.stl FGB_1500.stl FGB_1501.stl FGB_1502.stl FGB_1503.stl FGB_1504.stl FGB_1505.stl FGB_1506.stl FGB_1507.stl FGB_1508.stl FGB_FL_1036.stl FGB_FL_1079.stl FGB_FL_1310.stl FGB_FL_1316.stl FGB_FL_1330.stl FGB_FL_1350.stl FGB_FL_1500.stl FGB_FL_1502.stl FGB_HANDLES.stl FGB_HR1.stl FGB_HR2.stl FGB_HR3.stl FGB_HR4.stl GAP_SPANNER_2243_ANT.stl GAP_SPANNER_2443_2511.stl GAP_SPAN_0201_0239.stl GAP_SPAN_0219_0232.stl GAP_SPAN_0231_0232.stl GAP_SPAN_0251_0286.stl GAP_SPAN_0288_0259.stl GAP_SPAN_0296_0260.stl GAP_SPAN_ESP2_8013_L0293.stl GAP_SPAN_LAB_NODE2.stl GAP_SPAN_L_N1.stl GAP_SPAN_N1_121122.stl GAP_SPAN_N2_331_344.stl GAP_SPAN_N2_332_345.stl GAP_SPAN_N2_342_347.stl GAP_SPAN_N2_370_372.stl GAP_SPAN_N3_617_618.stl GAP_SPAN_N3_618_619.stl GAP_SPAN_N3_628_618.stl GAP_SPAN_N3_667_to_L_208.stl GAP_SPAN_N3_668_615.stl GAP_SPAN_N3_668_to_N1_112.stl GAP_SPAN_N3_671_to_N1_108.stl GAP_SPAN_N3_673_619.stl GAP_SPAN_N3_673_to_N1_106.stl GAP_SPAN_P1_N1.stl'
+ ' HWY_110.stl HWY_XXX.stl ISS_BSS_0001.stl ISS_BSS_0002.stl ISS_BSS_0003.stl ISS_BSS_0004.stl ISS_BSS_0005.stl ISS_BSS_0006.stl ISS_BSS_0007.stl ISS_BSS_0008.stl ISS_BSS_0009.stl JEF_1219.stl JEF_1220.stl JEF_1221.stl JEF_1222.stl JEF_7000.stl JEF_7001.stl JEF_7002.stl JEF_7003.stl JEF_7004.stl JEF_7005.stl JEF_7006.stl JEF_7007.stl JEF_7008.stl JEF_7009.stl JEF_7010.stl JEF_7011.stl JEF_7012.stl JEF_7013.stl JEF_7014.stl JEF_7015.stl JEF_7016.stl JEF_7017.stl JEF_7018.stl JEF_7019.stl JEF_7020.stl JEF_7021.stl JEF_7022.stl JEF_7023.stl JEF_7024.stl JEF_7025.stl JEF_7026.stl JEF_7027.stl JEF_7028.stl JEF_7029.stl JEF_7030.stl JEF_7031.stl JEF_7032.stl JEF_7033.stl JEF_7034.stl JEF_7035.stl JEF_7036.stl JEF_7037.stl JEF_7038.stl JEF_7039.stl JEF_7040.stl JEF_7041.stl JEF_7042.stl JEF_7043.stl JEF_7044.stl JEF_7045.stl JEF_7046.stl JEF_7047.stl JEF_7048.stl JEF_7049.stl JEF_7050.stl JEF_7051.stl JEF_7052.stl JEF_7053.stl JEF_7054.stl JEF_7055.stl JEF_7056.stl JEF_7057.stl JEF_7058.stl JEF_7059.stl JEF_7060.stl JEF_7061.stl JEF_7062.stl JEF_7063.stl JEF_7064.stl JEF_7065.stl JEF_7066.stl JEF_7067.stl JEF_7068.stl JEF_7069.stl JEF_7070.stl JEF_7071.stl JEF_7072.stl JELM_1225.stl JELM_1226.stl JELM_1227.stl JELM_1228.stl JELM_1229.stl JELM_1230.stl JELM_1231.stl JELM_1232.stl JELM_1233.stl JELM_1234.stl JELM_1235.stl JELM_1236.stl JELM_1237.stl JELM_1238.stl JELM_1239.stl JELM_1240.stl JELM_1241.stl JELM_1242.stl JELM_1243.stl JELM_1244.stl JELM_1245.stl JELM_1246.stl JELM_1247.stl JELM_1248.stl JELM_1249.stl JELM_1250.stl JELM_1251.stl JELM_1252.stl JELM_1253.stl JELM_1254.stl JELM_1255.stl JELM_1256.stl JELM_1257.stl JELM_1258.stl JELM_1259.stl JELM_1260.stl JELM_1261.stl JELM_1262.stl JELM_1263.stl JELM_1264.stl JELM_1265.stl JELM_1266.stl JELM_1267.stl JELM_1268.stl JELM_1269.stl JELM_1270.stl JELM_1271.stl JELM_1272.stl JELM_1273.stl JELM_1274.stl JELM_1275.stl JELM_1276.stl JPM_1100.stl JPM_1101.stl JPM_1102.stl JPM_1103.stl JPM_1104.stl JPM_1105.stl JPM_1106.stl JPM_1107.stl JPM_1108.stl JPM_1109.stl JPM_1110.stl JPM_1111.stl JPM_1112.stl JPM_1113.stl JPM_1114.stl JPM_1115.stl JPM_1116.stl JPM_1117.stl JPM_1118.stl JPM_1119.stl JPM_1120.stl JPM_1121.stl JPM_1122.stl JPM_1123.stl JPM_1124.stl JPM_1125.stl JPM_1126.stl JPM_1127.stl JPM_1128.stl JPM_1129.stl JPM_1130.stl JPM_1131.stl JPM_1132.stl JPM_1133.stl JPM_1134.stl JPM_1135.stl JPM_1136.stl JPM_1137.stl JPM_1138.stl JPM_1139.stl JPM_1140.stl JPM_1141.stl JPM_1142.stl JPM_1143.stl JPM_1144.stl JPM_1145.stl JPM_1146.stl JPM_1147.stl JPM_1148.stl JPM_1149.stl'
+ ' JPM_1150.stl JPM_1151.stl JPM_1152.stl JPM_1153.stl JPM_1154.stl JPM_1155.stl JPM_1156.stl JPM_1157.stl JPM_1158.stl JPM_1159.stl JPM_1160.stl JPM_1161.stl JPM_1162.stl JPM_1163.stl JPM_1164.stl JPM_1165.stl JPM_1166.stl JPM_1167.stl JPM_1169.stl JPM_1170.stl JPM_1171.stl JPM_1172.stl JPM_1173.stl JPM_1174.stl JPM_1175.stl JPM_1176.stl JPM_1177.stl JPM_1178.stl JPM_1179.stl JPM_1180.stl JPM_1181.stl JPM_1182.stl JPM_1183.stl JPM_1184.stl JPM_1185.stl JPM_1186.stl JPM_1187.stl JPM_1188.stl JPM_1189.stl JPM_1190.stl JPM_1191.stl JPM_1192.stl JPM_1193.stl JPM_1194.stl JPM_1195.stl JPM_1196.stl JPM_1197.stl JPM_1199.stl JPM_1200.stl JPM_1201.stl JPM_1202.stl JPM_1203.stl JPM_1204.stl JPM_1205.stl JPM_1206.stl JPM_1207.stl JPM_1208.stl JPM_1209.stl JPM_1210.stl JPM_1211.stl JPM_1212.stl JPM_1213.stl JPM_1214.stl JPM_1215.stl JPM_1216.stl JPM_1217.stl JPM_1218.stl LAB_0200.stl LAB_0201.stl LAB_0202.stl LAB_0203.stl LAB_0204.stl LAB_0205.stl LAB_0206.stl LAB_0207.stl LAB_0208.stl LAB_0209.stl LAB_0210.stl LAB_0211.stl LAB_0212.stl LAB_0213.stl LAB_0214.stl LAB_0215.stl LAB_0216.stl LAB_0217.stl LAB_0218.stl LAB_0219.stl LAB_0220.stl LAB_0221.stl LAB_0222.stl LAB_0223.stl LAB_0224.stl LAB_0225.stl LAB_0226.stl LAB_0227.stl LAB_0228.stl LAB_0229.stl LAB_0230.stl LAB_0231.stl LAB_0232.stl LAB_0233.stl LAB_0234.stl LAB_0235.stl LAB_0236.stl LAB_0237.stl LAB_0238.stl LAB_0239.stl LAB_0240.stl LAB_0241.stl LAB_0242.stl LAB_0243.stl LAB_0244.stl LAB_0245.stl LAB_0246.stl LAB_0247.stl LAB_0248.stl LAB_0249.stl LAB_0250.stl LAB_0251.stl LAB_0252.stl LAB_0253.stl LAB_0254.stl LAB_0255.stl LAB_0256.stl LAB_0257.stl LAB_0258.stl LAB_0259.stl LAB_0260.stl LAB_0261.stl LAB_0262.stl LAB_0263.stl LAB_0264.stl LAB_0265.stl LAB_0266.stl LAB_0267.stl LAB_0268.stl LAB_0269.stl LAB_0270.stl LAB_0271.stl LAB_0272.stl LAB_0273.stl LAB_0274.stl LAB_0275.stl LAB_0277.stl LAB_0279.stl LAB_0280.stl LAB_0281.stl LAB_0282.stl LAB_0285.stl LAB_0286.stl LAB_0287.stl LAB_0288.stl LAB_0291.stl LAB_0292.stl LAB_0293.stl LAB_0294.stl LAB_0295.stl LAB_0296.stl LAB_0297.stl LAB_0298.stl LAB_SLIDEWIRE.stl MBS_8400.stl MBS_8401.stl MBS_8402.stl MBS_8403.stl MBS_8404.stl MBS_8405.stl MBS_8406.stl MBS_8407.stl MBS_8408.stl MBS_8409.stl MBS_8410.stl MBS_8411.stl MBS_8412.stl MBS_8413.stl MBS_8414.stl MBS_8415.stl MBS_8416.stl MBS_8417.stl MLM_AL_4050.stl MLM_AL_4051.stl MLM_AL_4052.stl MLM_AL_4053.stl MLM_AL_4054.stl MLM_AL_4055.stl MLM_AL_4056.stl MLM_AL_4057.stl MLM_AL_4058.stl MLM_AL_4059.stl MLM_AL_4060.stl MLM_AL_4061.stl MLM_AL_4062.stl MLM_AL_4063.stl MLM_AL_4064.stl MLM_AL_4065.stl MLM_RAD_4151.stl MLM_RAD_4152.stl MLM_RAD_4153.stl MLM_RAD_4154.stl MLM_RAD_4155.stl MLM_RAD_4156.stl MLM_RAD_4157.stl MRM1_5001.stl MRM1_5002.stl MRM1_5003.stl MRM1_5004.stl MRM1_5005.stl MRM1_5006.stl MRM1_5007.stl MRM1_5008.stl MRM1_5009.stl MRM1_5010.stl MRM1_5011.stl MRM1_5012.stl MRM1_5013.stl MRM1_5014.stl MRM1_5015.stl MRM1_5016.stl MRM1_5017.stl MRM1_5018.stl MRM1_5019.stl MRM1_5020.stl MRM1_5021.stl MRM1_5022.stl MRM1_5023.stl MRM1_5024.stl MRM1_5025.stl MRM1_5026.stl MRM1_5027.stl MRM1_5028.stl MRM1_5029.stl MRM1_5030.stl MRM1_5031.stl MRM1_5032.stl MRM1_5033.stl MRM1_5034.stl'
+ ' MRM1_5035.stl MRM1_5036.stl MRM1_5037.stl MRM1_5038.stl MRM1_5039.stl MRM1_5040.stl MRM1_5041.stl MRM1_5042.stl MRM1_5043.stl MRM1_5044.stl MRM1_5045.stl MRM1_5046.stl MRM1_5047.stl MRM1_5048.stl MRM1_5049.stl MRM1_5050.stl MRM1_5051.stl MRM1_5052.stl MRM1_5053.stl MRM1_5056.stl MRM1_5057.stl MRM1_5058.stl MRM1_5059.stl MRM1_5060.stl MRM1_5061.stl MRM1_5062.stl MRM1_5063.stl MRM1_5064.stl MRM1_5065.stl MRM1_5066.stl MRM1_5067.stl MRM1_5068.stl MRM1_5069.stl MRM1_5070.stl MRM1_5071.stl MRM1_5072.stl MRM1_5073.stl MRM1_5074.stl MRM1_5075.stl MRM1_5076.stl MRM1_5077.stl MRM1_5078.stl MRM1_5079.stl MRM1_5080.stl MRM1_5081.stl MRM1_5082.stl MRM1_5083.stl MRM1_5084.stl MRM1_5085.stl MRM1_5086.stl MRM1_5087.stl MRM1_5088.stl MRM1_5089.stl MRM1_5090.stl MRM1_5091.stl MRM1_5092.stl MRM1_5093.stl MRM1_5094.stl MRM1_5095.stl MRM1_HANDHOLDS.stl MRM2_6001.stl MRM2_6002.stl MRM2_6003.stl MRM2_6004.stl MRM2_6005.stl MRM2_6006.stl MRM2_6007.stl MRM2_6008.stl MRM2_6009.stl MRM2_6010.stl MRM2_6011.stl MRM2_6012.stl MRM2_6013.stl MRM2_6014.stl MRM2_6014_6032_STRAP.stl MRM2_6015.stl MRM2_6016.stl MRM2_6017.stl MRM2_6018.stl MRM2_6019.stl MRM2_6020.stl MRM2_6021.stl MRM2_6022.stl MRM2_6022_2232_STRAP.stl MRM2_6023.stl MRM2_6024.stl MRM2_6025.stl MRM2_6026.stl MRM2_6027.stl MRM2_6028.stl MRM2_6029.stl MRM2_6030.stl MRM2_6031.stl MRM2_6032.stl MRM2_6033.stl MRM2_6034.stl MRM2_6035.stl MRM2_6036.stl MRM2_6037.stl MRM2_6038.stl MRM2_6039.stl MRM2_6040.stl MRM2_6041.stl MRM2_6042.stl MRM2_6043.stl MRM2_6044.stl MRM2_6045.stl MRM2_6046.stl MT_N_P_h.stl MT_N_S_h.stl MT_P_H1.stl MT_P_H2.stl MT_P_H3.stl MT_P_H4.stl MT_S_h.stl MT_Z_H1.stl MT_Z_H2.stl MT_Z_H3.stl MT_Z_P_h.stl N2_0300.stl N2_0301.stl N2_0302.stl N2_0303.stl N2_0304.stl N2_0305.stl N2_0306.stl N2_0307.stl N2_0308.stl N2_0309.stl N2_0310.stl N2_0311.stl N2_0312.stl N2_0313.stl N2_0314.stl N2_0315.stl N2_0316.stl N2_0317.stl N2_0318.stl N2_0319.stl N2_0320.stl N2_0321.stl N2_0322.stl N2_0323.stl N2_0324.stl N2_0325.stl N2_0326.stl N2_0327.stl N2_0328.stl N2_0329.stl N2_0330.stl N2_0331.stl N2_0332.stl N2_0333.stl N2_0334.stl N2_0335.stl N2_0336.stl N2_0337.stl N2_0338.stl N2_0339.stl N2_0340.stl N2_0341.stl N2_0342.stl N2_0343.stl N2_0344.stl N2_0345.stl N2_0346.stl N2_0347.stl N2_0348.stl N2_0349.stl N2_0350.stl N2_0351.stl N2_0352.stl N2_0353.stl N2_0354.stl N2_0355.stl N2_0356.stl N2_0357.stl N2_0358.stl N2_0359.stl N2_0360.stl N2_0361.stl N2_0362.stl N2_0363.stl N2_0364.stl N2_0365.stl N2_0366.stl N2_0367.stl N2_0368.stl N2_0369.stl N2_0370.stl N2_0372.stl N2_0373.stl N2_0374.stl N2_0375.stl N2_0376.stl N2_0377.stl N2_0378.stl N2_0379.stl N2_0380.stl N2_0381.stl N2_0382.stl N2_0383.stl N2_0384.stl N2_0385.stl N2_0386.stl N2_0387.stl N3_0600.stl N3_0601.stl N3_0602.stl N3_0603.stl N3_0604.stl N3_0605.stl N3_0606A.stl N3_0607.stl N3_0608.stl N3_0609.stl N3_0610.stl N3_0611.stl N3_0612.stl N3_0613.stl N3_0614.stl N3_0615.stl N3_0616.stl N3_0617.stl N3_0618.stl N3_0619.stl N3_0620.stl N3_0621.stl N3_0623.stl N3_0624.stl N3_0625.stl N3_0626.stl N3_0627.stl N3_0628.stl N3_0629.stl N3_0630.stl N3_0631.stl N3_0632.stl N3_0633.stl N3_0634.stl N3_0635.stl N3_0636.stl N3_0637.stl N3_0638.stl'
+ ' N3_0639.stl N3_0640A.stl N3_0641.stl N3_0642.stl N3_0643.stl N3_0644.stl N3_0645.stl N3_0646.stl N3_0647.stl N3_0648.stl N3_0649.stl N3_0650.stl N3_0651.stl N3_0652.stl N3_0653.stl N3_0654.stl N3_0655.stl N3_0656.stl N3_0657.stl N3_0658.stl N3_0659.stl N3_0660.stl N3_0661.stl N3_0662.stl N3_0663.stl N3_0664.stl N3_0665.stl N3_0666.stl N3_0667.stl N3_0668.stl N3_0669.stl N3_0670.stl N3_0671.stl N3_0672.stl N3_0673.stl N3_0674.stl N3_0675.stl N3_0676.stl N3_0677.stl N3_0678.stl N3_0679.stl N3_0680.stl N3_0681.stl N3_0682.stl N3_0683.stl N3_0684.stl N3_0685.stl N3_0686.stl NODE1_0100.stl NODE1_0101.stl NODE1_0102.stl NODE1_0103.stl NODE1_0104.stl NODE1_0105.stl NODE1_0106.stl NODE1_0107.stl NODE1_0108.stl NODE1_0109.stl NODE1_0110.stl NODE1_0111.stl NODE1_0111_R.stl NODE1_0112.stl NODE1_0113.stl NODE1_0114.stl NODE1_0115.stl NODE1_0116.stl NODE1_0117.stl NODE1_0118.stl NODE1_0119.stl NODE1_0121.stl NODE1_0122.stl NODE1_0123.stl NODE1_0124.stl NODE1_0125.stl NODE1_0126.stl NODE1_0127.stl NODE1_0128.stl NODE1_0129.stl NODE1_0130.stl NODE1_0131.stl NODE1_0132.stl NODE1_0133.stl NODE1_0134.stl NODE1_0135.stl NODE1_0136.stl NODE1_0137.stl NODE1_0138.stl NODE1_0139.stl NODE1_0140.stl NODE1_0141.stl NODE1_0142.stl NODE1_0143.stl NODE1_0144.stl NODE1_0145.stl NODE1_EH1.stl NODE1_EH2.stl NODE1_EH3.stl NODE1_EH4.stl NODE1_EH5.stl NODE1_EH6.stl NODE1_EH7.stl NODE1_EH8.stl P1_3600.stl P1_3601.stl P1_3602.stl P1_3603.stl P1_3604.stl P1_3605.stl P1_3606.stl P1_3607.stl P1_3608.stl P1_3609.stl P1_3610.stl P1_3611.stl P1_3612.stl P1_3613.stl P1_3614.stl P1_3615.stl P1_3616.stl P1_3617.stl P1_3618.stl P1_3619.stl P1_3620.stl P1_3621.stl P1_3622.stl P1_3623.stl P1_3624.stl P1_3625.stl P1_3626.stl P1_3627.stl P1_3628.stl P1_3629.stl P1_3630.stl P1_3631.stl P1_3632.stl P1_3633.stl P1_3634.stl P1_3635.stl P1_3636.stl P1_3637.stl P1_3638.stl P1_3639.stl P1_3640.stl P1_3641.stl P1_3642.stl P1_3643.stl P1_3644.stl P1_3645.stl P1_3646.stl P1_3647.stl P1_3648.stl P1_3649.stl P1_3650.stl P1_3651.stl P1_3652.stl P1_3653.stl P1_3654.stl P1_3655.stl P1_3656.stl P1_3657.stl P1_3658.stl P1_3659.stl P1_3660.stl P1_3661.stl P1_3662.stl P1_3663.stl P1_3664.stl P1_3665.stl P1_3666.stl P1_3667.stl P1_3668.stl P1_3669.stl P1_3670.stl P1_3671.stl P1_3672.stl P1_3673.stl P1_3674.stl P1_3675.stl P1_3676.stl P1_3677.stl P1_3678.stl P1_3679.stl P1_3680.stl P1_3681.stl P1_3683.stl P1_3684.stl P1_3685.stl P1_3686.stl P1_3687.stl P1_3688.stl P1_3690.stl P1_3691.stl P1_3692.stl P1_CETA_H1.stl P1_CETA_H2.stl P1_CETA_H3.stl P1_CETA_H4.stl P1_K1_H1.stl P1_K1_H2.stl P1_K1_H3.stl P1_K2_H1.stl P1_K2_H2.stl P1_K2_H3.stl P3HK1.stl P3HK2.stl P3_3800.stl P3_3801.stl P3_3802.stl P3_3803.stl P3_3804.stl P3_3805.stl P3_3806.stl P3_3807.stl P3_3808.stl P3_3809.stl P3_3810.stl P3_3811.stl P3_3812.stl P3_3813.stl P3_3814.stl P3_3815.stl P3_3816.stl P3_3817.stl P3_3818.stl P3_3819.stl P3_3820.stl P3_3821.stl P3_3822.stl P3_3823.stl P3_3824.stl P3_3825.stl P3_3826.stl P3_3827.stl P3_3828.stl P3_3829.stl P3_3830.stl P3_3831.stl P3_3832.stl P3_3833.stl P3_3834.stl P3_3835.stl P3_3836.stl P3_3837.stl P3_3838.stl P3_3839.stl P3_3840.stl P3_3841.stl P3_3842.stl P3_3843.stl P3_3844.stl P3_3845.stl'
+ ' P3_3846.stl P3_3847.stl P3_3848.stl P3_3849.stl P3_3850.stl P3_3851.stl P3_3852.stl P3_3853.stl P3_3854.stl P3_3855.stl P3_3856.stl P3_3857.stl P3_3858.stl P3_3859.stl P3_3860.stl P3_3861.stl P3_3862.stl P3_3863.stl P3_3864.stl P3_3865.stl P3_3866.stl P3_3867.stl P3_3868.stl P3_3869.stl P3_3870.stl P3_3871.stl P3_3872.stl P3_3873.stl P3_3874.stl P3_3875.stl P3_3876.stl P3_3877.stl P3_3878.stl P3_3879.stl P3_3880.stl P3_3881.stl P3_3882.stl P3_3883.stl P5_5201.stl P5_5202.stl P5_5203.stl P5_5204.stl P5_5205.stl P5_5206.stl P5_5207.stl P5_5208.stl P5_5209.stl P5_5210.stl P5_5211.stl P5_5212.stl P5_5213.stl P5_5214.stl P5_5215.stl P5_5216.stl P5_5217.stl P5_5218.stl P5_5219.stl P5_5220.stl P5_5221.stl P5_5222.stl P5_5223.stl P5_5224.stl P5_5225.stl P5_5226.stl P5_5227.stl P5_5228.stl P5_5229.stl P5_5230.stl P5_5231.stl P5_5232.stl P5_5233.stl P5_5234.stl P5_5235.stl P5_5236.stl P5_5237.stl P5_5238.stl P5_5239.stl P5_5240.stl P5_5241.stl P5_5242.stl P5_5243.stl P5_5244.stl P5_5245.stl P6_5303.stl P6_5304.stl P6_5305.stl P6_5306.stl P6_5307.stl P6_5308.stl P6_5309.stl P6_5310.stl P6_5311.stl P6_5312.stl P6_5313.stl P6_5314.stl P6_5315.stl P6_5316.stl P6_5317.stl P6_5318.stl P6_5319.stl P6_5320.stl P6_5321.stl P6_5322.stl P6_5323.stl P6_5324.stl P6_5325.stl P6_5326.stl P6_5327.stl P6_5328.stl P6_5329.stl P6_5330.stl P6_5331.stl P6_5332.stl P6_5333.stl P6_5334.stl P6_5335.stl P6_5336.stl P6_5337.stl P6_5338.stl P6_5339.stl P6_5340.stl P6_5341.stl P6_5342.stl P6_5343.stl P6_5344.stl P6_5345.stl P6_5346.stl P6_5347.stl P6_5348.stl P6_5349.stl P6_5350.stl P6_5351.stl P6_5352.stl P6_5353.stl P6_5354.stl P6_5355.stl P6_5356.stl P6_5357.stl P6_5358.stl P6_5359.stl P6_5360.stl P6_5361.stl P6_5362.stl P6_5363.stl P6_5364.stl P6_5365.stl P6_5366.stl P6_5367.stl P6_5368.stl P6_5369.stl P6_5370.stl P6_5371.stl P6_5372.stl P6_5373.stl P6_5374.stl P6_5375.stl P6_5376.stl P6_5385.stl P6_5386.stl P6_5387.stl P6_5388.stl P6_5389.stl P6_5390.stl P6_5391.stl PMA1_0001.stl PMA1_0002.stl PMA1_0003.stl PMA1_0004.stl PMA1_0005.stl PMA1_0006.stl PMA1_0007.stl PMA1_0008.stl PMA1_0009.stl PMA1_0010.stl PMA1_0011.stl PMA1_0012.stl PMA1_0013.stl PMA1_0014.stl PMA1_0015.stl PMA1_MDM_H.stl PMA2_0400.stl PMA2_0401.stl PMA2_0402.stl PMA2_0403.stl PMA2_0404.stl PMA2_0405.stl PMA2_0406.stl PMA2_0407.stl PMA2_0408.stl PMA2_0409.stl PMA2_0410.stl PMA2_0411.stl PMA2_0412.stl PMA2_0413.stl PMA2_0414.stl PMA2_0415.stl PMA2_0416.stl PMA2_0417.stl PMA2_0418.stl PMA3_1600.stl PMA3_1601.stl PMA3_1602.stl PMA3_1603.stl PMA3_1604.stl PMA3_1605.stl PMA3_1606.stl PMA3_1607.stl PMA3_1608.stl PMA3_1609.stl PMA3_1610.stl PMA3_1611.stl PMA3_1612.stl PMA3_1613.stl PMA3_1614.stl PMA3_1615.stl PMA3_1616.stl PMA3_1617.stl PMA3_1618.stl S0_3400.stl S0_3401.stl S0_3402.stl S0_3403.stl S0_3404.stl S0_3405.stl S0_3406.stl S0_3407.stl S0_3408.stl S0_3409.stl S0_3410.stl S0_3411.stl S0_3412.stl S0_3413.stl S0_3414.stl S0_3415.stl S0_3416.stl S0_3417.stl S0_3418.stl S0_3419.stl S0_3420.stl S0_3421.stl S0_3422.stl S0_3423.stl S0_3424.stl S0_3425.stl S0_3426.stl S0_3427.stl S0_3428.stl S0_3429.stl S0_3430.stl S0_3431.stl S0_3432.stl S0_3433.stl S0_3434.stl S0_3435.stl S0_3436.stl S0_3437.stl'
+ ' S0_3438.stl S0_3439.stl S0_3440.stl S0_3441.stl S0_3442.stl S0_3443.stl S0_3444.stl S0_3445.stl S0_3446.stl S0_3447.stl S0_3448.stl S0_3449.stl S0_3450.stl S0_3451.stl S0_3452.stl S0_3453.stl S0_3454.stl S0_3455.stl S0_3456.stl S0_3457.stl S0_3458.stl S0_3459.stl S0_3460.stl S0_3461.stl S0_3462.stl S0_3463.stl S0_3464.stl S0_3465.stl S0_3466.stl S0_3467.stl S0_3468.stl S0_3469.stl S0_3470.stl S0_3471.stl S0_3472.stl S0_3473.stl S0_3474.stl S0_3475.stl S0_3476.stl S0_3477.stl S0_3478.stl S0_3479.stl S0_3480.stl S0_3482.stl S0_3483.stl S0_3484.stl S0_3485.stl S0_3486.stl S0_3487.stl S0_3488.stl S0_3489.stl S0_3490.stl S0_3491.stl S0_3492.stl S0_3493.stl S0_3494.stl S0_3495.stl S0_3496.stl S0_3497.stl S0_3498.stl S0_3499.stl S0_3500.stl S0_3501.stl S0_3502.stl S0_3503.stl S0_3504.stl S0_3505.stl S0_3506.stl S0_3507.stl S0_3508.stl S0_3509.stl S0_3510.stl S0_3511.stl S0_3512.stl S0_3513.stl S0_3514.stl S0_3515.stl S0_3516.stl S0_3517.stl S0_3518.stl S0_3519.stl S0_3520.stl S0_3521.stl S0_3522.stl S0_3523.stl S0_3524.stl S0_3525.stl S0_3526.stl S0_3527.stl S0_3528.stl S0_3529.stl S0_3530.stl S0_3531.stl S0_3532.stl S0_3533.stl S0_3534.stl S0_3535.stl S0_3536.stl S0_3537.stl S0_3538.stl S0_3539.stl S0_3540.stl S0_3541.stl S0_3542.stl S0_3543.stl S0_3544.stl S0_3545.stl S0_3546.stl S0_3547.stl S0_3548.stl S0_3549.stl S0_3550.stl S0_3551.stl S0_GAP_SPAN_3427_3424.stl S0_KP_H1.stl S0_KP_H2.stl S0_KP_H3.stl S0_KS_H1.stl S0_KS_H2.stl S0_KS_H3.stl S0_TRAY_H1.stl S0_TRAY_H2.stl S0_TRAY_H3.stl S0_TRAY_H4.stl S0_TRAY_H5.stl S1_3200.stl S1_3201.stl S1_3202.stl S1_3203.stl S1_3204.stl S1_3205.stl S1_3206.stl S1_3207.stl S1_3208.stl S1_3210.stl S1_3211.stl S1_3212.stl S1_3213.stl S1_3214.stl S1_3215.stl S1_3217.stl S1_3218.stl S1_3219.stl S1_3220.stl S1_3221.stl S1_3222.stl S1_3223.stl S1_3224.stl S1_3225.stl S1_3226.stl S1_3227.stl S1_3228.stl S1_3229.stl S1_3230.stl S1_3231.stl S1_3232.stl S1_3233.stl S1_3234.stl S1_3235.stl S1_3236.stl S1_3237.stl S1_3238.stl S1_3239.stl S1_3240.stl S1_3241.stl S1_3242.stl S1_3243.stl S1_3244.stl S1_3245.stl S1_3246.stl S1_3247.stl S1_3248.stl S1_3249.stl S1_3250.stl S1_3251.stl S1_3252.stl S1_3253.stl S1_3254.stl S1_3255.stl S1_3256.stl S1_3257.stl S1_3258.stl S1_3259.stl S1_3260.stl S1_3261.stl S1_3262.stl S1_3263.stl S1_3264.stl S1_3265.stl S1_3266.stl S1_3267.stl S1_3268.stl S1_3269.stl S1_3270.stl S1_3271.stl S1_3272.stl S1_3273.stl S1_3274.stl S1_3275.stl S1_3276.stl S1_3277.stl S1_3278.stl S1_3279.stl S1_3280.stl S1_3281.stl S1_3282.stl S1_3283.stl S1_3284.stl S1_3285.stl S1_3286.stl S1_3287.stl S1_3288.stl S1_3289.stl S1_3290.stl S1_3291.stl S1_3292.stl S1_CETA_H1.stl S1_CETA_H2.stl S1_CETA_H3.stl S1_CETA_H4.stl S1_K1_H1.stl S1_K1_H2.stl S1_K1_H3.stl S1_K2_H1.stl S1_K2_H2.stl S1_K2_H3.stl S3HK1.stl S3HK2.stl S3_3000.stl S3_3001.stl S3_3002.stl S3_3003.stl S3_3004.stl S3_3005.stl S3_3006.stl S3_3007.stl S3_3008.stl S3_3009.stl S3_3010.stl S3_3011.stl S3_3012.stl S3_3013.stl S3_3014.stl S3_3015.stl S3_3016.stl S3_3017.stl S3_3018.stl S3_3019.stl S3_3020.stl S3_3021.stl S3_3022.stl S3_3023.stl S3_3024.stl S3_3025.stl S3_3026.stl S3_3027.stl S3_3028.stl S3_3029.stl S3_3030.stl S3_3031.stl S3_3032.stl'
+ ' S3_3033.stl S3_3034.stl S3_3035.stl S3_3036.stl S3_3037.stl S3_3038.stl S3_3039.stl S3_3040.stl S3_3041.stl S3_3042.stl S3_3043.stl S3_3044.stl S3_3045.stl S3_3046.stl S3_3047.stl S3_3048.stl S3_3049.stl S3_3050.stl S3_3051.stl S3_3052.stl S3_3053.stl S3_3054.stl S3_3055.stl S3_3056.stl S3_3057.stl S3_3058.stl S3_3059.stl S3_3060.stl S3_3061.stl S3_3062.stl S3_3063.stl S3_3064.stl S3_3065.stl S3_3066.stl S3_3067.stl S3_3068.stl S3_3069.stl S3_3070.stl S3_3071.stl S3_3072.stl S3_3073.stl S3_3074.stl S3_3075.stl S3_3076.stl S3_3077.stl S3_3078.stl S3_3079.stl S3_3080.stl S3_3081.stl S3_3082.stl S3_3083.stl S4_2203.stl S4_2204.stl S4_2205.stl S4_2207.stl S4_2208.stl S4_2209.stl S4_2210.stl S4_2211.stl S4_2212.stl S4_2213.stl S4_2214.stl S4_2215.stl S4_2216.stl S4_2217.stl S4_2218.stl S4_2219.stl S4_2220.stl S4_2221.stl S4_2222.stl S4_2223.stl S4_2224.stl S4_2225.stl S4_2226.stl S4_2227.stl S4_2228.stl S4_2229.stl S4_2230.stl S4_2231.stl S4_2232.stl S4_2233.stl S4_2234.stl S4_2235.stl S4_2236.stl S4_2237.stl S4_2238.stl S4_2239.stl S4_2240.stl S4_2241.stl S4_2242.stl S4_2243.stl S4_2244.stl S4_2245.stl S4_2246.stl S4_2247.stl S4_2248.stl S4_2249.stl S4_2250.stl S4_2251.stl S4_2252.stl S4_2253.stl S4_2254.stl S4_2255.stl S4_2256.stl S4_2257.stl S4_2258.stl S4_2259.stl S4_2260.stl S4_2261.stl S4_2262.stl S4_2263.stl S4_2264.stl S4_2265.stl S4_2268.stl S4_2269.stl S4_2270.stl S4_2271.stl S4_2272.stl S4_2273.stl S4_2274.stl S4_2275.stl S5_2101.stl S5_2102.stl S5_2103.stl S5_2104.stl S5_2105.stl S5_2106.stl S5_2107.stl S5_2108.stl S5_2109.stl S5_2110.stl S5_2111.stl S5_2112.stl S5_2113.stl S5_2114.stl S5_2115.stl S5_2116.stl S5_2117.stl S5_2118.stl S5_2119.stl S5_2120.stl S5_2121.stl S5_2122.stl S5_2123.stl S5_2124.stl S5_2125.stl S5_2126.stl S5_2127.stl S5_2128.stl S5_2129.stl S5_2130.stl S5_2131.stl S5_2132.stl S5_2133.stl S5_2134.stl S5_2135.stl S5_2136.stl S5_2137.stl S5_2138.stl S5_2139.stl S5_2140.stl S5_2141.stl S5_2142.stl S5_2143.stl S5_2144.stl S6_1993.stl S6_1994.stl S6_1999.stl S6_2003.stl S6_2004.stl S6_2005.stl S6_2006.stl S6_2007.stl S6_2008.stl S6_2009.stl S6_2010.stl S6_2011.stl S6_2012.stl S6_2013.stl S6_2014.stl S6_2015.stl S6_2016.stl S6_2017.stl S6_2018.stl S6_2019.stl S6_2020.stl S6_2021.stl S6_2022.stl S6_2023.stl S6_2024.stl S6_2025.stl S6_2026.stl S6_2027.stl S6_2028.stl S6_2029.stl S6_2030.stl S6_2031.stl S6_2032.stl S6_2033.stl S6_2034.stl S6_2035.stl S6_2036.stl S6_2037.stl S6_2038.stl S6_2039.stl S6_2040.stl S6_2041.stl S6_2042.stl S6_2043.stl S6_2044.stl S6_2045.stl S6_2046.stl S6_2047.stl S6_2048.stl S6_2049.stl S6_2050.stl S6_2051.stl S6_2052.stl S6_2053.stl S6_2054.stl S6_2055.stl S6_2056.stl S6_2057.stl S6_2058.stl S6_2059.stl S6_2060.stl S6_2061.stl S6_2062.stl S6_2063.stl S6_2064.stl S6_2065.stl S6_2066.stl S6_2067.stl S6_2068.stl S6_2069.stl S6_2070.stl S6_2071.stl S6_2072.stl S6_2073.stl S6_2074.stl S6_2075.stl S6_2076.stl S6_2077.stl S6_2078.stl S6_2079.stl S6_2080.stl S6_2081.stl S6_2082.stl S6_2083.stl S6_2084.stl S6_2085.stl S6_2086.stl S6_2087.stl S6_2090.stl S6_2091.stl S6_2092.stl S6_2093.stl S6_2094.stl S6_2095.stl S6_2096.stl S6_2097.stl SM_2111.stl SM_2112.stl SM_2113.stl SM_2121.stl'
+ ' SM_2122.stl SM_2123.stl SM_2124.stl SM_2125.stl SM_2211.stl SM_2212.stl SM_2213.stl SM_2214.stl SM_2215.stl SM_2216.stl SM_2221.stl SM_2222.stl SM_2223.stl SM_2224.stl SM_2225.stl SM_2226.stl SM_2231.stl SM_2232.stl SM_2233.stl SM_2234.stl SM_2235.stl SM_2241.stl SM_2242.stl SM_2243.stl SM_2244.stl SM_2245.stl SM_2246.stl SM_2311.stl SM_2312.stl SM_2313.stl SM_2314.stl SM_2315.stl SM_2316.stl SM_2317.stl SM_2318.stl SM_2331.stl SM_2332.stl SM_2333.stl SM_2334.stl SM_2335.stl SM_2336.stl SM_2337.stl SM_2338.stl SM_2411.stl SM_2412.stl SM_2413.stl SM_2414.stl SM_2421.stl SM_2422.stl SM_2423.stl SM_2424.stl SM_2431.stl SM_2432.stl SM_2433.stl SM_2434.stl SM_2435.stl SM_2441.stl SM_2442.stl SM_2443.stl SM_2511.stl SM_2512.stl SM_2513.stl SM_2514.stl SM_2515.stl SM_2516.stl SM_2517.stl SM_2518.stl SM_2521.stl SM_2522.stl SM_2523.stl SM_2524.stl SM_2525.stl SM_2526.stl SM_2541.stl SM_2542.stl SM_2611.stl SM_2612.stl SM_2613.stl SM_2614.stl SM_2615.stl SM_2616.stl SM_2617.stl SM_2618.stl SM_2619.stl SM_2621.stl SM_2622.stl SM_2623.stl SM_2624.stl SM_2625.stl SM_2626.stl SM_2627.stl SM_2631.stl SM_2632.stl SM_2633.stl SM_2634.stl SM_2635.stl SM_2636.stl SM_2637.stl SM_2641.stl SM_2642.stl SM_2643.stl SM_2644.stl SM_2645.stl SM_2646.stl SM_2647.stl SM_2648.stl SM_2711.stl SM_2712.stl SM_2713.stl SM_2714.stl SM_2715.stl SM_2716.stl SM_2721.stl SM_2722.stl SM_2723.stl SM_2724.stl SM_2725.stl SM_2726.stl SM_2731.stl SM_2732.stl SM_2733.stl SM_2734.stl SM_2741.stl SM_2742.stl SM_2743.stl SM_2744.stl SM_2745.stl SM_2746.stl SM_2747.stl SM_2748.stl SOFT_LOOPS_ON_AFT_SHROUD.stl SOFT_LOOPS_ON_STBD_SHROUD.stl Z1_6000(pool_handle).stl Z1_6001.stl Z1_6002.stl Z1_6003.stl Z1_6004.stl Z1_6005.stl Z1_6006.stl Z1_6007.stl Z1_6008.stl Z1_6009.stl Z1_6010.stl Z1_6011.stl Z1_6012.stl Z1_6013.stl Z1_6014.stl Z1_6015.stl Z1_6016.stl Z1_6017.stl Z1_6018.stl Z1_6019.stl Z1_6020.stl Z1_6021.stl Z1_6022.stl Z1_6023.stl Z1_6024.stl Z1_6025.stl Z1_6026.stl Z1_6027.stl Z1_6028.stl Z1_6029.stl Z1_6030.stl Z1_6031.stl Z1_6032.stl Z1_6033.stl Z1_6034.stl Z1_6035.stl Z1_6036.stl Z1_6037.stl Z1_6038.stl Z1_6039.stl Z1_6040.stl Z1_6041.stl Z1_6042.stl Z1_6043.stl Z1_6044.stl Z1_6045.stl Z1_6046.stl Z1_6047.stl Z1_6048.stl Z1_6049.stl Z1_6050.stl Z1_6051.stl Z1_6052.stl Z1_6053.stl Z1_6054.stl Z1_6055.stl Z1_6056.stl Z1_6057.stl Z1_6058.stl Z1_6059.stl Z1_6060.stl Z1_6061.stl Z1_6062.stl Z1_GE1.stl Z1_GE2.stl p4_5103.stl p4_5104.stl p4_5105.stl p4_5106.stl p4_5107.stl p4_5108.stl p4_5109.stl p4_5110.stl p4_5111.stl p4_5112.stl p4_5113.stl p4_5114.stl p4_5115.stl p4_5116.stl p4_5117.stl p4_5118.stl p4_5119.stl p4_5120.stl p4_5121.stl p4_5122.stl p4_5123.stl p4_5124.stl p4_5125.stl p4_5126.stl p4_5127.stl p4_5128.stl p4_5129.stl p4_5130.stl p4_5131.stl p4_5132.stl p4_5133.stl p4_5134.stl p4_5135.stl p4_5136.stl p4_5137.stl p4_5138.stl p4_5139.stl p4_5140.stl p4_5141.stl p4_5142.stl p4_5143.stl p4_5144.stl p4_5145.stl p4_5146.stl p4_5147.stl p4_5148.stl p4_5149.stl p4_5150.stl p4_5151.stl p4_5152.stl p4_5153.stl p4_5154.stl p4_5155.stl p4_5156.stl p4_5157.stl p4_5158.stl p4_5159.stl p4_5160.stl p4_5161.stl p4_5162.stl p4_5163.stl p4_5164.stl p4_5165.stl p4_5168.stl'
+ ' p4_5169.stl p4_5170.stl p4_5171.stl p4_5172.stl p4_5173.stl p4_5174.stl p4_5175.stl s4_2206.stl zh36.stl zh37.stl'
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