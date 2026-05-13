import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line, Cell } from "recharts";

// ══════════════════════════════════════════════════════════════════════════════
// DATA — Separated for easy updates. Replace this block when data refreshes.
// ══════════════════════════════════════════════════════════════════════════════
const D={"ml":{"2025-10":"Oct 25","2025-11":"Nov 25","2025-12":"Dec 25","2026-1":"Jan 26","2026-2":"Feb 26","2026-3":"Mar 26","2026-4":"Apr 26"},"chs":["DM","NULL","CRM","Platform","Share","Update","Social Media Team","SEO","Referral"],"pulse":[{"m":"Oct 25","to":5367,"no":808,"ta":1264432,"na":250541},{"m":"Nov 25","to":5406,"no":659,"ta":1194473,"na":201844},{"m":"Dec 25","to":4920,"no":780,"ta":1193887,"na":261382},{"m":"Jan 26","to":4188,"no":942,"ta":1252112,"na":313640},{"m":"Feb 26","to":3320,"no":847,"ta":1013712,"na":324312},{"m":"Mar 26","to":3715,"no":871,"ta":1159740,"na":327545},{"m":"Apr 26","to":3566,"no":775,"ta":1088831,"na":305609}],"cs":[{"m":"Oct 25","DM":209,"DM_a":61025,"NULL":259,"NULL_a":41698,"CRM":192,"CRM_a":75781,"Platform":96,"Platform_a":54630,"Share":37,"Share_a":12096,"Update":7,"Update_a":1851,"Social Media Team":4,"Social Media Team_a":1000,"SEO":4,"SEO_a":2459,"Referral":0,"Referral_a":0},{"m":"Nov 25","DM":130,"DM_a":37471,"NULL":244,"NULL_a":23993,"CRM":133,"CRM_a":54652,"Platform":95,"Platform_a":65095,"Share":30,"Share_a":7111,"Update":14,"Update_a":5117,"Social Media Team":6,"Social Media Team_a":6380,"SEO":6,"SEO_a":1924,"Referral":1,"Referral_a":100},{"m":"Dec 25","DM":190,"DM_a":112401,"NULL":259,"NULL_a":26079,"CRM":183,"CRM_a":73986,"Platform":82,"Platform_a":24913,"Share":40,"Share_a":12205,"Update":13,"Update_a":3092,"Social Media Team":3,"Social Media Team_a":500,"SEO":8,"SEO_a":6506,"Referral":2,"Referral_a":1700},{"m":"Jan 26","DM":297,"DM_a":118113,"NULL":282,"NULL_a":35307,"CRM":151,"CRM_a":71676,"Platform":132,"Platform_a":64875,"Share":45,"Share_a":7141,"Update":3,"Update_a":800,"Social Media Team":25,"Social Media Team_a":8662,"SEO":3,"SEO_a":5500,"Referral":2,"Referral_a":200},{"m":"Feb 26","DM":317,"DM_a":162597,"NULL":244,"NULL_a":37229,"CRM":149,"CRM_a":73360,"Platform":86,"Platform_a":38185,"Share":37,"Share_a":6330,"Update":7,"Update_a":1701,"Social Media Team":6,"Social Media Team_a":4610,"SEO":1,"SEO_a":300,"Referral":0,"Referral_a":0},{"m":"Mar 26","DM":277,"DM_a":94885,"NULL":239,"NULL_a":49142,"CRM":201,"CRM_a":83355,"Platform":96,"Platform_a":78378,"Share":36,"Share_a":6788,"Update":13,"Update_a":3802,"Social Media Team":4,"Social Media Team_a":1965,"SEO":3,"SEO_a":8230,"Referral":2,"Referral_a":1000},{"m":"Apr 26","DM":230,"DM_a":102563,"NULL":216,"NULL_a":55879,"CRM":134,"CRM_a":68260,"Platform":102,"Platform_a":53442,"Share":67,"Share_a":18906,"Update":15,"Update_a":3150,"Social Media Team":7,"Social Media Team_a":1443,"SEO":2,"SEO_a":1816,"Referral":2,"Referral_a":150}],"asv":[{"m":"Oct 25","All":310,"All_o":808,"All_a":250541,"DM":292,"DM_o":209,"NULL":161,"NULL_o":259,"CRM":395,"CRM_o":192,"Platform":569,"Platform_o":96,"Share":327,"Share_o":37,"Update":264,"Update_o":7,"Social Media Team":250,"Social Media Team_o":4,"SEO":615,"SEO_o":4,"Referral":0,"Referral_o":0},{"m":"Nov 25","All":306,"All_o":659,"All_a":201844,"DM":288,"DM_o":130,"NULL":98,"NULL_o":244,"CRM":411,"CRM_o":133,"Platform":685,"Platform_o":95,"Share":237,"Share_o":30,"Update":366,"Update_o":14,"Social Media Team":1063,"Social Media Team_o":6,"SEO":321,"SEO_o":6,"Referral":100,"Referral_o":1},{"m":"Dec 25","All":335,"All_o":780,"All_a":261382,"DM":592,"DM_o":190,"NULL":101,"NULL_o":259,"CRM":404,"CRM_o":183,"Platform":304,"Platform_o":82,"Share":305,"Share_o":40,"Update":238,"Update_o":13,"Social Media Team":167,"Social Media Team_o":3,"SEO":813,"SEO_o":8,"Referral":850,"Referral_o":2},{"m":"Jan 26","All":333,"All_o":942,"All_a":313640,"DM":398,"DM_o":297,"NULL":125,"NULL_o":282,"CRM":475,"CRM_o":151,"Platform":491,"Platform_o":132,"Share":159,"Share_o":45,"Update":267,"Update_o":3,"Social Media Team":346,"Social Media Team_o":25,"SEO":1833,"SEO_o":3,"Referral":100,"Referral_o":2},{"m":"Feb 26","All":383,"All_o":847,"All_a":324312,"DM":513,"DM_o":317,"NULL":153,"NULL_o":244,"CRM":492,"CRM_o":149,"Platform":444,"Platform_o":86,"Share":171,"Share_o":37,"Update":243,"Update_o":7,"Social Media Team":768,"Social Media Team_o":6,"SEO":300,"SEO_o":1,"Referral":0,"Referral_o":0},{"m":"Mar 26","All":376,"All_o":871,"All_a":327545,"DM":343,"DM_o":277,"NULL":206,"NULL_o":239,"CRM":415,"CRM_o":201,"Platform":816,"Platform_o":96,"Share":189,"Share_o":36,"Update":292,"Update_o":13,"Social Media Team":491,"Social Media Team_o":4,"SEO":2743,"SEO_o":3,"Referral":500,"Referral_o":2},{"m":"Apr 26","All":394,"All_o":775,"All_a":305609,"DM":446,"DM_o":230,"NULL":259,"NULL_o":216,"CRM":509,"CRM_o":134,"Platform":524,"Platform_o":102,"Share":282,"Share_o":67,"Update":210,"Update_o":15,"Social Media Team":206,"Social Media Team_o":7,"SEO":908,"SEO_o":2,"Referral":75,"Referral_o":2}],"asvC":{"All":[{"m":"Oct 25","All":310,"DM":292,"NULL":161,"CRM":395,"Platform":569,"Share":327,"Update":264,"Social Media Team":250,"SEO":615,"Referral":0},{"m":"Nov 25","All":306,"DM":288,"NULL":98,"CRM":411,"Platform":685,"Share":237,"Update":366,"Social Media Team":1063,"SEO":321,"Referral":100},{"m":"Dec 25","All":335,"DM":592,"NULL":101,"CRM":404,"Platform":304,"Share":305,"Update":238,"Social Media Team":167,"SEO":813,"Referral":850},{"m":"Jan 26","All":333,"DM":398,"NULL":125,"CRM":475,"Platform":491,"Share":159,"Update":267,"Social Media Team":346,"SEO":1833,"Referral":100},{"m":"Feb 26","All":383,"DM":513,"NULL":153,"CRM":492,"Platform":444,"Share":171,"Update":243,"Social Media Team":768,"SEO":300,"Referral":0},{"m":"Mar 26","All":376,"DM":343,"NULL":206,"CRM":415,"Platform":816,"Share":189,"Update":292,"Social Media Team":491,"SEO":2743,"Referral":500},{"m":"Apr 26","All":394,"DM":446,"NULL":259,"CRM":509,"Platform":524,"Share":282,"Update":210,"Social Media Team":206,"SEO":908,"Referral":75}],"India":[{"m":"Oct 25","All":138,"DM":143,"NULL":61,"CRM":159,"Platform":280,"Share":178,"Update":150,"Social Media Team":250,"SEO":100,"Referral":0},{"m":"Nov 25","All":150,"DM":152,"NULL":42,"CRM":180,"Platform":376,"Share":196,"Update":258,"Social Media Team":220,"SEO":180,"Referral":100},{"m":"Dec 25","All":144,"DM":195,"NULL":38,"CRM":124,"Platform":253,"Share":225,"Update":184,"Social Media Team":167,"SEO":813,"Referral":850},{"m":"Jan 26","All":154,"DM":167,"NULL":52,"CRM":181,"Platform":289,"Share":147,"Update":267,"Social Media Team":165,"SEO":1833,"Referral":100},{"m":"Feb 26","All":150,"DM":170,"NULL":66,"CRM":184,"Platform":278,"Share":157,"Update":243,"Social Media Team":350,"SEO":300,"Referral":0},{"m":"Mar 26","All":181,"DM":163,"NULL":89,"CRM":197,"Platform":411,"Share":165,"Update":292,"Social Media Team":200,"SEO":996,"Referral":500},{"m":"Apr 26","All":214,"DM":188,"NULL":174,"CRM":181,"Platform":414,"Share":168,"Update":204,"Social Media Team":133,"SEO":908,"Referral":75}],"United States":[{"m":"Oct 25","All":1336,"DM":1428,"NULL":1429,"CRM":1320,"Platform":961,"Share":1320,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Nov 25","All":1837,"DM":1361,"NULL":1110,"CRM":1282,"Platform":3039,"Share":0,"Update":0,"Social Media Team":5280,"SEO":0,"Referral":0},{"m":"Dec 25","All":1184,"DM":1234,"NULL":1344,"CRM":1195,"Platform":550,"Share":0,"Update":890,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Jan 26","All":1556,"DM":1572,"NULL":1350,"CRM":1301,"Platform":2561,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Feb 26","All":1620,"DM":1707,"NULL":1810,"CRM":1292,"Platform":1743,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Mar 26","All":1663,"DM":1610,"NULL":2218,"CRM":1158,"Platform":2842,"Share":0,"Update":0,"Social Media Team":1365,"SEO":0,"Referral":0},{"m":"Apr 26","All":1448,"DM":1767,"NULL":1225,"CRM":1416,"Platform":974,"Share":1645,"Update":100,"Social Media Team":0,"SEO":0,"Referral":0}],"Canada":[{"m":"Oct 25","All":784,"DM":716,"NULL":1215,"CRM":702,"Platform":0,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Nov 25","All":643,"DM":519,"NULL":532,"CRM":549,"Platform":1547,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Dec 25","All":797,"DM":792,"NULL":774,"CRM":829,"Platform":0,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Jan 26","All":601,"DM":611,"NULL":490,"CRM":652,"Platform":0,"Share":0,"Update":0,"Social Media Team":650,"SEO":0,"Referral":0},{"m":"Feb 26","All":808,"DM":642,"NULL":842,"CRM":847,"Platform":991,"Share":0,"Update":0,"Social Media Team":977,"SEO":0,"Referral":0},{"m":"Mar 26","All":696,"DM":669,"NULL":1006,"CRM":691,"Platform":666,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Apr 26","All":821,"DM":869,"NULL":1262,"CRM":771,"Platform":482,"Share":893,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0}],"United Arab Emirates":[{"m":"Oct 25","All":545,"DM":874,"NULL":1,"CRM":796,"Platform":0,"Share":712,"Update":949,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Nov 25","All":496,"DM":458,"NULL":406,"CRM":593,"Platform":524,"Share":100,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Dec 25","All":920,"DM":2747,"NULL":481,"CRM":479,"Platform":0,"Share":720,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Jan 26","All":866,"DM":768,"NULL":1026,"CRM":549,"Platform":2933,"Share":736,"Update":0,"Social Media Team":633,"SEO":0,"Referral":0},{"m":"Feb 26","All":642,"DM":605,"NULL":100,"CRM":802,"Platform":0,"Share":728,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Mar 26","All":825,"DM":562,"NULL":60,"CRM":586,"Platform":2806,"Share":0,"Update":0,"Social Media Team":0,"SEO":5104,"Referral":0},{"m":"Apr 26","All":743,"DM":451,"NULL":355,"CRM":936,"Platform":2127,"Share":744,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0}],"Australia":[{"m":"Oct 25","All":817,"DM":809,"NULL":177,"CRM":535,"Platform":5744,"Share":0,"Update":0,"Social Media Team":0,"SEO":1129,"Referral":0},{"m":"Nov 25","All":682,"DM":759,"NULL":0,"CRM":567,"Platform":0,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Dec 25","All":626,"DM":591,"NULL":589,"CRM":587,"Platform":886,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Jan 26","All":689,"DM":639,"NULL":889,"CRM":655,"Platform":838,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Feb 26","All":745,"DM":772,"NULL":0,"CRM":627,"Platform":0,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Mar 26","All":896,"DM":817,"NULL":0,"CRM":721,"Platform":2224,"Share":644,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Apr 26","All":692,"DM":657,"NULL":641,"CRM":575,"Platform":1316,"Share":660,"Update":0,"Social Media Team":643,"SEO":0,"Referral":0}]},"asvO":{"All":[{"m":"Oct 25","All":310,"DM":292,"NULL":161,"CRM":395,"Platform":569,"Share":327,"Update":264,"Social Media Team":250,"SEO":615,"Referral":0},{"m":"Nov 25","All":306,"DM":288,"NULL":98,"CRM":411,"Platform":685,"Share":237,"Update":366,"Social Media Team":1063,"SEO":321,"Referral":100},{"m":"Dec 25","All":335,"DM":592,"NULL":101,"CRM":404,"Platform":304,"Share":305,"Update":238,"Social Media Team":167,"SEO":813,"Referral":850},{"m":"Jan 26","All":333,"DM":398,"NULL":125,"CRM":475,"Platform":491,"Share":159,"Update":267,"Social Media Team":346,"SEO":1833,"Referral":100},{"m":"Feb 26","All":383,"DM":513,"NULL":153,"CRM":492,"Platform":444,"Share":171,"Update":243,"Social Media Team":768,"SEO":300,"Referral":0},{"m":"Mar 26","All":376,"DM":343,"NULL":206,"CRM":415,"Platform":816,"Share":189,"Update":292,"Social Media Team":491,"SEO":2743,"Referral":500},{"m":"Apr 26","All":394,"DM":446,"NULL":259,"CRM":509,"Platform":524,"Share":282,"Update":210,"Social Media Team":206,"SEO":908,"Referral":75}],"normal_order":[{"m":"Oct 25","All":288,"DM":223,"NULL":145,"CRM":397,"Platform":581,"Share":339,"Update":264,"Social Media Team":233,"SEO":615,"Referral":0},{"m":"Nov 25","All":283,"DM":247,"NULL":75,"CRM":424,"Platform":619,"Share":222,"Update":366,"Social Media Team":1445,"SEO":321,"Referral":100},{"m":"Dec 25","All":329,"DM":681,"NULL":96,"CRM":417,"Platform":303,"Share":315,"Update":238,"Social Media Team":167,"SEO":887,"Referral":850},{"m":"Jan 26","All":322,"DM":368,"NULL":114,"CRM":523,"Platform":500,"Share":108,"Update":267,"Social Media Team":372,"SEO":1833,"Referral":100},{"m":"Feb 26","All":339,"DM":447,"NULL":117,"CRM":535,"Platform":445,"Share":128,"Update":243,"Social Media Team":531,"SEO":300,"Referral":0},{"m":"Mar 26","All":378,"DM":329,"NULL":184,"CRM":436,"Platform":835,"Share":150,"Update":282,"Social Media Team":491,"SEO":2743,"Referral":500},{"m":"Apr 26","All":380,"DM":409,"NULL":258,"CRM":507,"Platform":533,"Share":261,"Update":210,"Social Media Team":191,"SEO":1516,"Referral":75}],"main_order":[{"m":"Oct 25","All":414,"DM":463,"NULL":409,"CRM":387,"Platform":360,"Share":289,"Update":0,"Social Media Team":300,"SEO":0,"Referral":0},{"m":"Nov 25","All":450,"DM":409,"NULL":410,"CRM":361,"Platform":2721,"Share":264,"Update":0,"Social Media Team":300,"SEO":0,"Referral":0},{"m":"Dec 25","All":368,"DM":419,"NULL":233,"CRM":338,"Platform":333,"Share":285,"Update":0,"Social Media Team":0,"SEO":300,"Referral":0},{"m":"Jan 26","All":377,"DM":457,"NULL":254,"CRM":314,"Platform":280,"Share":260,"Update":0,"Social Media Team":267,"SEO":0,"Referral":0},{"m":"Feb 26","All":578,"DM":669,"NULL":661,"CRM":342,"Platform":400,"Share":273,"Update":0,"Social Media Team":1955,"SEO":0,"Referral":0},{"m":"Mar 26","All":368,"DM":368,"NULL":694,"CRM":330,"Platform":233,"Share":267,"Update":350,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Apr 26","All":474,"DM":557,"NULL":271,"CRM":518,"Platform":340,"Share":323,"Update":0,"Social Media Team":300,"SEO":300,"Referral":0}]},"chb":{"DM":{"c":{"o":230,"a":102563,"v":446,"ns":160,"rs":70},"p":{"o":277,"a":94885,"v":343,"ns":213,"rs":64},"a3":{"o":297.0,"a":125198,"v":422,"ns":221.0,"rs":76.0},"a6":{"o":236.7,"a":97749,"v":413,"ns":171.0,"rs":65.7}},"NULL":{"c":{"o":216,"a":55879,"v":259,"ns":46,"rs":170},"p":{"o":239,"a":49142,"v":206,"ns":47,"rs":192},"a3":{"o":255.0,"a":40559,"v":159,"ns":55.3,"rs":199.7},"a6":{"o":254.5,"a":35575,"v":140,"ns":51.0,"rs":203.5}},"CRM":{"c":{"o":134,"a":68260,"v":509,"ns":81,"rs":53},"p":{"o":201,"a":83355,"v":415,"ns":135,"rs":66},"a3":{"o":167.0,"a":76131,"v":456,"ns":117.3,"rs":49.7},"a6":{"o":168.2,"a":72135,"v":429,"ns":112.7,"rs":55.5}},"Platform":{"c":{"o":102,"a":53442,"v":524,"ns":76,"rs":26},"p":{"o":96,"a":78378,"v":816,"ns":74,"rs":22},"a3":{"o":104.7,"a":60479,"v":578,"ns":72.3,"rs":32.3},"a6":{"o":97.8,"a":54346,"v":555,"ns":66.3,"rs":31.5}},"Share":{"c":{"o":67,"a":18906,"v":282,"ns":61,"rs":6},"p":{"o":36,"a":6788,"v":189,"ns":35,"rs":1},"a3":{"o":39.3,"a":6753,"v":172,"ns":36.7,"rs":2.7},"a6":{"o":37.5,"a":8612,"v":230,"ns":35.0,"rs":2.5}},"Update":{"c":{"o":15,"a":3150,"v":210,"ns":13,"rs":2},"p":{"o":13,"a":3802,"v":292,"ns":10,"rs":3},"a3":{"o":7.7,"a":2101,"v":274,"ns":6.3,"rs":1.3},"a6":{"o":9.5,"a":2727,"v":287,"ns":7.3,"rs":2.2}},"Social Media Team":{"c":{"o":7,"a":1443,"v":206,"ns":3,"rs":4},"p":{"o":4,"a":1965,"v":491,"ns":4,"rs":0},"a3":{"o":11.7,"a":5079,"v":435,"ns":9.7,"rs":2.0},"a6":{"o":8.0,"a":3853,"v":482,"ns":6.2,"rs":1.8}},"SEO":{"c":{"o":2,"a":1816,"v":908,"ns":2,"rs":0},"p":{"o":3,"a":8230,"v":2743,"ns":3,"rs":0},"a3":{"o":2.3,"a":4677,"v":2004,"ns":2.0,"rs":0.3},"a6":{"o":4.2,"a":4153,"v":997,"ns":2.8,"rs":1.3}},"Referral":{"c":{"o":2,"a":150,"v":75,"ns":1,"rs":1},"p":{"o":2,"a":1000,"v":500,"ns":2,"rs":0},"a3":{"o":1.3,"a":400,"v":300,"ns":1.3,"rs":0.0},"a6":{"o":1.2,"a":500,"v":429,"ns":1.2,"rs":0.0}},"Total":{"c":{"o":775,"a":305609,"v":394,"ns":443,"rs":332},"p":{"o":871,"a":327545,"v":376,"ns":523,"rs":348},"a3":{"o":886.7,"a":321832,"v":363,"ns":522.7,"rs":364.0},"a6":{"o":817.8,"a":279877,"v":342,"ns":453.8,"rs":364.0}}},"dm":[{"m":"Oct 25","DM_ns":147,"DM_rs":62,"DM_no":6,"NULL_ns":46,"NULL_rs":213,"NULL_no":4,"CRM_ns":129,"CRM_rs":63,"CRM_no":1,"Platform_ns":57,"Platform_rs":39,"Platform_no":24,"Share_ns":34,"Share_rs":3,"Share_no":0,"Update_ns":4,"Update_rs":3,"Update_no":0,"Social Media Team_ns":3,"Social Media Team_rs":1,"Social Media Team_no":0,"SEO_ns":3,"SEO_rs":1,"SEO_no":1,"Referral_ns":0,"Referral_rs":0,"Referral_no":0,"t_ns":423,"t_no":36,"t":808},{"m":"Nov 25","DM_ns":83,"DM_rs":47,"DM_no":3,"NULL_ns":50,"NULL_rs":194,"NULL_no":10,"CRM_ns":95,"CRM_rs":38,"CRM_no":2,"Platform_ns":67,"Platform_rs":28,"Platform_no":30,"Share_ns":30,"Share_rs":0,"Share_no":2,"Update_ns":11,"Update_rs":3,"Update_no":1,"Social Media Team_ns":3,"Social Media Team_rs":3,"Social Media Team_no":0,"SEO_ns":2,"SEO_rs":4,"SEO_no":0,"Referral_ns":1,"Referral_rs":0,"Referral_no":1,"t_ns":342,"t_no":49,"t":659},{"m":"Dec 25","DM_ns":133,"DM_rs":57,"DM_no":3,"NULL_ns":44,"NULL_rs":215,"NULL_no":13,"CRM_ns":100,"CRM_rs":83,"CRM_no":3,"Platform_ns":57,"Platform_rs":25,"Platform_no":22,"Share_ns":36,"Share_rs":4,"Share_no":2,"Update_ns":10,"Update_rs":3,"Update_no":0,"Social Media Team_ns":2,"Social Media Team_rs":1,"Social Media Team_no":2,"SEO_ns":6,"SEO_rs":2,"SEO_no":2,"Referral_ns":2,"Referral_rs":0,"Referral_no":1,"t_ns":390,"t_no":48,"t":780},{"m":"Jan 26","DM_ns":228,"DM_rs":69,"DM_no":17,"NULL_ns":66,"NULL_rs":216,"NULL_no":20,"CRM_ns":111,"CRM_rs":40,"CRM_no":2,"Platform_ns":84,"Platform_rs":48,"Platform_no":22,"Share_ns":40,"Share_rs":5,"Share_no":1,"Update_ns":3,"Update_rs":0,"Update_no":1,"Social Media Team_ns":25,"Social Media Team_rs":0,"Social Media Team_no":2,"SEO_ns":2,"SEO_rs":1,"SEO_no":0,"Referral_ns":2,"Referral_rs":0,"Referral_no":2,"t_ns":563,"t_no":68,"t":942},{"m":"Feb 26","DM_ns":222,"DM_rs":95,"DM_no":5,"NULL_ns":53,"NULL_rs":191,"NULL_no":18,"CRM_ns":106,"CRM_rs":43,"CRM_no":6,"Platform_ns":59,"Platform_rs":27,"Platform_no":23,"Share_ns":35,"Share_rs":2,"Share_no":0,"Update_ns":6,"Update_rs":1,"Update_no":0,"Social Media Team_ns":0,"Social Media Team_rs":6,"Social Media Team_no":0,"SEO_ns":1,"SEO_rs":0,"SEO_no":0,"Referral_ns":0,"Referral_rs":0,"Referral_no":0,"t_ns":482,"t_no":52,"t":847},{"m":"Mar 26","DM_ns":213,"DM_rs":64,"DM_no":2,"NULL_ns":47,"NULL_rs":192,"NULL_no":14,"CRM_ns":135,"CRM_rs":66,"CRM_no":3,"Platform_ns":74,"Platform_rs":22,"Platform_no":35,"Share_ns":35,"Share_rs":1,"Share_no":1,"Update_ns":10,"Update_rs":3,"Update_no":0,"Social Media Team_ns":4,"Social Media Team_rs":0,"Social Media Team_no":1,"SEO_ns":3,"SEO_rs":0,"SEO_no":0,"Referral_ns":2,"Referral_rs":0,"Referral_no":2,"t_ns":523,"t_no":58,"t":871},{"m":"Apr 26","DM_ns":160,"DM_rs":70,"DM_no":5,"NULL_ns":46,"NULL_rs":170,"NULL_no":7,"CRM_ns":81,"CRM_rs":53,"CRM_no":2,"Platform_ns":76,"Platform_rs":26,"Platform_no":21,"Share_ns":61,"Share_rs":6,"Share_no":0,"Update_ns":13,"Update_rs":2,"Update_no":0,"Social Media Team_ns":3,"Social Media Team_rs":4,"Social Media Team_no":0,"SEO_ns":2,"SEO_rs":0,"SEO_no":0,"Referral_ns":1,"Referral_rs":1,"Referral_no":1,"t_ns":443,"t_no":36,"t":775}],"pm":[{"m":"Oct 25","sip_payment_standalone":68,"sip_inactive":266,"sip_welcome":295,"sip_welcome_failed":0,"stories":75,"thank_you":49,"fundraiser":31,"Blank":23},{"m":"Nov 25","sip_payment_standalone":79,"sip_inactive":233,"sip_welcome":176,"sip_welcome_failed":0,"stories":83,"thank_you":41,"fundraiser":22,"Blank":24},{"m":"Dec 25","sip_payment_standalone":74,"sip_inactive":295,"sip_welcome":238,"sip_welcome_failed":0,"stories":83,"thank_you":35,"fundraiser":26,"Blank":28},{"m":"Jan 26","sip_payment_standalone":87,"sip_inactive":254,"sip_welcome":353,"sip_welcome_failed":0,"stories":117,"thank_you":67,"fundraiser":39,"Blank":23},{"m":"Feb 26","sip_payment_standalone":66,"sip_inactive":230,"sip_welcome":320,"sip_welcome_failed":0,"stories":83,"thank_you":71,"fundraiser":21,"Blank":53},{"m":"Mar 26","sip_payment_standalone":95,"sip_inactive":232,"sip_welcome":319,"sip_welcome_failed":1,"stories":101,"thank_you":72,"fundraiser":28,"Blank":20},{"m":"Apr 26","sip_payment_standalone":87,"sip_inactive":201,"sip_welcome":301,"sip_welcome_failed":0,"stories":90,"thank_you":44,"fundraiser":19,"Blank":32}],"dv":[{"m":"Oct 25","D":109,"M":642,"A":57,"DM_D":22,"DM_M":187,"DM_A":0,"NULL_D":44,"NULL_M":189,"NULL_A":26,"CRM_D":22,"CRM_M":167,"CRM_A":3,"Platform_D":12,"Platform_M":56,"Platform_A":28,"Share_D":6,"Share_M":31,"Share_A":0,"Update_D":0,"Update_M":7,"Update_A":0,"Social Media Team_D":1,"Social Media Team_M":3,"Social Media Team_A":0,"SEO_D":2,"SEO_M":2,"SEO_A":0,"Referral_D":0,"Referral_M":0,"Referral_A":0},{"m":"Nov 25","D":73,"M":548,"A":38,"DM_D":7,"DM_M":123,"DM_A":0,"NULL_D":30,"NULL_M":198,"NULL_A":16,"CRM_D":16,"CRM_M":117,"CRM_A":0,"Platform_D":15,"Platform_M":58,"Platform_A":22,"Share_D":4,"Share_M":26,"Share_A":0,"Update_D":1,"Update_M":13,"Update_A":0,"Social Media Team_D":0,"Social Media Team_M":6,"Social Media Team_A":0,"SEO_D":0,"SEO_M":6,"SEO_A":0,"Referral_D":0,"Referral_M":1,"Referral_A":0},{"m":"Dec 25","D":91,"M":649,"A":40,"DM_D":8,"DM_M":182,"DM_A":0,"NULL_D":48,"NULL_M":195,"NULL_A":16,"CRM_D":14,"CRM_M":169,"CRM_A":0,"Platform_D":16,"Platform_M":42,"Platform_A":24,"Share_D":2,"Share_M":38,"Share_A":0,"Update_D":1,"Update_M":12,"Update_A":0,"Social Media Team_D":0,"Social Media Team_M":3,"Social Media Team_A":0,"SEO_D":1,"SEO_M":7,"SEO_A":0,"Referral_D":1,"Referral_M":1,"Referral_A":0},{"m":"Jan 26","D":111,"M":772,"A":59,"DM_D":22,"DM_M":275,"DM_A":0,"NULL_D":33,"NULL_M":226,"NULL_A":23,"CRM_D":26,"CRM_M":125,"CRM_A":0,"Platform_D":23,"Platform_M":73,"Platform_A":36,"Share_D":5,"Share_M":40,"Share_A":0,"Update_D":0,"Update_M":3,"Update_A":0,"Social Media Team_D":0,"Social Media Team_M":25,"Social Media Team_A":0,"SEO_D":1,"SEO_M":2,"SEO_A":0,"Referral_D":0,"Referral_M":2,"Referral_A":0},{"m":"Feb 26","D":119,"M":701,"A":27,"DM_D":26,"DM_M":291,"DM_A":0,"NULL_D":45,"NULL_M":193,"NULL_A":6,"CRM_D":27,"CRM_M":122,"CRM_A":0,"Platform_D":14,"Platform_M":51,"Platform_A":21,"Share_D":7,"Share_M":30,"Share_A":0,"Update_D":0,"Update_M":7,"Update_A":0,"Social Media Team_D":0,"Social Media Team_M":6,"Social Media Team_A":0,"SEO_D":0,"SEO_M":1,"SEO_A":0,"Referral_D":0,"Referral_M":0,"Referral_A":0},{"m":"Mar 26","D":115,"M":719,"A":37,"DM_D":25,"DM_M":252,"DM_A":0,"NULL_D":36,"NULL_M":191,"NULL_A":12,"CRM_D":24,"CRM_M":177,"CRM_A":0,"Platform_D":24,"Platform_M":47,"Platform_A":25,"Share_D":4,"Share_M":32,"Share_A":0,"Update_D":0,"Update_M":13,"Update_A":0,"Social Media Team_D":0,"Social Media Team_M":4,"Social Media Team_A":0,"SEO_D":2,"SEO_M":1,"SEO_A":0,"Referral_D":0,"Referral_M":2,"Referral_A":0},{"m":"Apr 26","D":85,"M":650,"A":40,"DM_D":19,"DM_M":211,"DM_A":0,"NULL_D":26,"NULL_M":168,"NULL_A":22,"CRM_D":14,"CRM_M":119,"CRM_A":1,"Platform_D":19,"Platform_M":66,"Platform_A":17,"Share_D":4,"Share_M":63,"Share_A":0,"Update_D":1,"Update_M":14,"Update_A":0,"Social Media Team_D":0,"Social Media Team_M":7,"Social Media Team_A":0,"SEO_D":2,"SEO_M":0,"SEO_A":0,"Referral_D":0,"Referral_M":2,"Referral_A":0}],"co":[{"o":610,"a":130638,"v":214,"ns":359,"rs":251,"c":"India","chs":[{"o":182,"a":31739,"v":174,"ns":39,"rs":143,"ch":"NULL"},{"o":177,"a":33225,"v":188,"ns":128,"rs":49,"ch":"DM"},{"o":85,"a":35151,"v":414,"ns":67,"rs":18,"ch":"Platform"},{"o":85,"a":15407,"v":181,"ns":53,"rs":32,"ch":"CRM"},{"o":59,"a":9900,"v":168,"ns":56,"rs":3,"ch":"Share"},{"o":12,"a":2450,"v":204,"ns":11,"rs":1,"ch":"Update"},{"o":6,"a":800,"v":133,"ns":2,"rs":4,"ch":"Social Media Team"},{"o":2,"a":1816,"v":908,"ns":2,"rs":0,"ch":"SEO"},{"o":2,"a":150,"v":75,"ns":1,"rs":1,"ch":"Referral"}],"tr":{"All":[{"m":"Oct 25","o":661,"a":91238,"v":138},{"m":"Nov 25","o":536,"a":80146,"v":150},{"m":"Dec 25","o":641,"a":92134,"v":144},{"m":"Jan 26","o":760,"a":116752,"v":154},{"m":"Feb 26","o":629,"a":94059,"v":150},{"m":"Mar 26","o":679,"a":122577,"v":181},{"m":"Apr 26","o":610,"a":130638,"v":214}],"NULL":[{"m":"Oct 25","o":226,"a":13725,"v":61},{"m":"Nov 25","o":223,"a":9360,"v":42},{"m":"Dec 25","o":228,"a":8576,"v":38},{"m":"Jan 26","o":256,"a":13199,"v":52},{"m":"Feb 26","o":216,"a":14220,"v":66},{"m":"Mar 26","o":214,"a":19128,"v":89},{"m":"Apr 26","o":182,"a":31739,"v":174}],"Platform":[{"m":"Oct 25","o":85,"a":23835,"v":280},{"m":"Nov 25","o":80,"a":30070,"v":376},{"m":"Dec 25","o":77,"a":19507,"v":253},{"m":"Jan 26","o":114,"a":32893,"v":289},{"m":"Feb 26","o":73,"a":20261,"v":278},{"m":"Mar 26","o":80,"a":32855,"v":411},{"m":"Apr 26","o":85,"a":35151,"v":414}],"CRM":[{"m":"Oct 25","o":137,"a":21750,"v":159},{"m":"Nov 25","o":84,"a":15121,"v":180},{"m":"Dec 25","o":122,"a":15146,"v":124},{"m":"Jan 26","o":101,"a":18314,"v":181},{"m":"Feb 26","o":93,"a":17081,"v":184},{"m":"Mar 26","o":131,"a":25777,"v":197},{"m":"Apr 26","o":85,"a":15407,"v":181}],"DM":[{"m":"Oct 25","o":169,"a":24125,"v":143},{"m":"Nov 25","o":98,"a":14891,"v":152},{"m":"Dec 25","o":153,"a":29896,"v":195},{"m":"Jan 26","o":220,"a":36740,"v":167},{"m":"Feb 26","o":202,"a":34294,"v":170},{"m":"Mar 26","o":204,"a":33319,"v":163},{"m":"Apr 26","o":177,"a":33225,"v":188}],"SEO":[{"m":"Oct 25","o":2,"a":201,"v":100},{"m":"Nov 25","o":5,"a":902,"v":180},{"m":"Dec 25","o":8,"a":6506,"v":813},{"m":"Jan 26","o":3,"a":5500,"v":1833},{"m":"Feb 26","o":1,"a":300,"v":300},{"m":"Mar 26","o":1,"a":996,"v":996},{"m":"Apr 26","o":2,"a":1816,"v":908}],"Share":[{"m":"Oct 25","o":32,"a":5700,"v":178},{"m":"Nov 25","o":28,"a":5500,"v":196},{"m":"Dec 25","o":36,"a":8101,"v":225},{"m":"Jan 26","o":43,"a":6305,"v":147},{"m":"Feb 26","o":35,"a":5502,"v":157},{"m":"Mar 26","o":31,"a":5100,"v":165},{"m":"Apr 26","o":59,"a":9900,"v":168}],"Update":[{"m":"Oct 25","o":6,"a":902,"v":150},{"m":"Nov 25","o":12,"a":3102,"v":258},{"m":"Dec 25","o":12,"a":2202,"v":184},{"m":"Jan 26","o":3,"a":800,"v":267},{"m":"Feb 26","o":7,"a":1701,"v":243},{"m":"Mar 26","o":13,"a":3802,"v":292},{"m":"Apr 26","o":12,"a":2450,"v":204}],"Social Media Team":[{"m":"Oct 25","o":4,"a":1000,"v":250},{"m":"Nov 25","o":5,"a":1100,"v":220},{"m":"Dec 25","o":3,"a":500,"v":167},{"m":"Jan 26","o":17,"a":2800,"v":165},{"m":"Feb 26","o":2,"a":700,"v":350},{"m":"Mar 26","o":3,"a":600,"v":200},{"m":"Apr 26","o":6,"a":800,"v":133}],"Referral":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":1,"a":100,"v":100},{"m":"Dec 25","o":2,"a":1700,"v":850},{"m":"Jan 26","o":2,"a":200,"v":100},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":2,"a":1000,"v":500},{"m":"Apr 26","o":2,"a":150,"v":75}]}},{"o":64,"a":92663,"v":1448,"ns":36,"rs":28,"c":"United States","chs":[{"o":23,"a":40650,"v":1767,"ns":13,"rs":10,"ch":"DM"},{"o":20,"a":28328,"v":1416,"ns":14,"rs":6,"ch":"CRM"},{"o":11,"a":13475,"v":1225,"ns":3,"rs":8,"ch":"NULL"},{"o":7,"a":6820,"v":974,"ns":4,"rs":3,"ch":"Platform"},{"o":2,"a":3290,"v":1645,"ns":2,"rs":0,"ch":"Share"},{"o":1,"a":100,"v":100,"ns":0,"rs":1,"ch":"Update"}],"tr":{"All":[{"m":"Oct 25","o":57,"a":76160,"v":1336},{"m":"Nov 25","o":35,"a":64292,"v":1837},{"m":"Dec 25","o":42,"a":49727,"v":1184},{"m":"Jan 26","o":58,"a":90275,"v":1556},{"m":"Feb 26","o":65,"a":105305,"v":1620},{"m":"Mar 26","o":56,"a":93150,"v":1663},{"m":"Apr 26","o":64,"a":92663,"v":1448}],"DM":[{"m":"Oct 25","o":13,"a":18560,"v":1428},{"m":"Nov 25","o":8,"a":10890,"v":1361},{"m":"Dec 25","o":10,"a":12337,"v":1234},{"m":"Jan 26","o":21,"a":33015,"v":1572},{"m":"Feb 26","o":40,"a":68295,"v":1707},{"m":"Mar 26","o":14,"a":22535,"v":1610},{"m":"Apr 26","o":23,"a":40650,"v":1767}],"Share":[{"m":"Oct 25","o":2,"a":2640,"v":1320},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":2,"a":3290,"v":1645}],"CRM":[{"m":"Oct 25","o":25,"a":33010,"v":1320},{"m":"Nov 25","o":11,"a":14105,"v":1282},{"m":"Dec 25","o":24,"a":28680,"v":1195},{"m":"Jan 26","o":24,"a":31215,"v":1301},{"m":"Feb 26","o":15,"a":19380,"v":1292},{"m":"Mar 26","o":24,"a":27800,"v":1158},{"m":"Apr 26","o":20,"a":28328,"v":1416}],"Platform":[{"m":"Oct 25","o":5,"a":4805,"v":961},{"m":"Nov 25","o":9,"a":27355,"v":3039},{"m":"Dec 25","o":2,"a":1100,"v":550},{"m":"Jan 26","o":7,"a":17930,"v":2561},{"m":"Feb 26","o":7,"a":12200,"v":1743},{"m":"Mar 26","o":6,"a":17050,"v":2842},{"m":"Apr 26","o":7,"a":6820,"v":974}],"NULL":[{"m":"Oct 25","o":12,"a":17145,"v":1429},{"m":"Nov 25","o":6,"a":6662,"v":1110},{"m":"Dec 25","o":5,"a":6720,"v":1344},{"m":"Jan 26","o":5,"a":6750,"v":1350},{"m":"Feb 26","o":3,"a":5430,"v":1810},{"m":"Mar 26","o":11,"a":24400,"v":2218},{"m":"Apr 26","o":11,"a":13475,"v":1225}],"Update":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":1,"a":890,"v":890},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":1,"a":100,"v":100}]}},{"o":33,"a":27101,"v":821,"ns":15,"rs":18,"c":"Canada","chs":[{"o":13,"a":10021,"v":771,"ns":5,"rs":8,"ch":"CRM"},{"o":12,"a":10432,"v":869,"ns":7,"rs":5,"ch":"DM"},{"o":3,"a":1446,"v":482,"ns":2,"rs":1,"ch":"Platform"},{"o":3,"a":2678,"v":893,"ns":0,"rs":3,"ch":"Share"},{"o":2,"a":2523,"v":1262,"ns":1,"rs":1,"ch":"NULL"}],"tr":{"All":[{"m":"Oct 25","o":13,"a":10192,"v":784},{"m":"Nov 25","o":19,"a":12208,"v":643},{"m":"Dec 25","o":24,"a":19129,"v":797},{"m":"Jan 26","o":28,"a":16819,"v":601},{"m":"Feb 26","o":44,"a":35552,"v":808},{"m":"Mar 26","o":24,"a":16698,"v":696},{"m":"Apr 26","o":33,"a":27101,"v":821}],"CRM":[{"m":"Oct 25","o":8,"a":5615,"v":702},{"m":"Nov 25","o":8,"a":4392,"v":549},{"m":"Dec 25","o":7,"a":5805,"v":829},{"m":"Jan 26","o":4,"a":2609,"v":652},{"m":"Feb 26","o":12,"a":10166,"v":847},{"m":"Mar 26","o":14,"a":9671,"v":691},{"m":"Apr 26","o":13,"a":10021,"v":771}],"NULL":[{"m":"Oct 25","o":2,"a":2430,"v":1215},{"m":"Nov 25","o":4,"a":2126,"v":532},{"m":"Dec 25","o":8,"a":6192,"v":774},{"m":"Jan 26","o":5,"a":2451,"v":490},{"m":"Feb 26","o":14,"a":11795,"v":842},{"m":"Mar 26","o":1,"a":1006,"v":1006},{"m":"Apr 26","o":2,"a":2523,"v":1262}],"DM":[{"m":"Oct 25","o":3,"a":2147,"v":716},{"m":"Nov 25","o":5,"a":2595,"v":519},{"m":"Dec 25","o":9,"a":7132,"v":792},{"m":"Jan 26","o":15,"a":9160,"v":611},{"m":"Feb 26","o":12,"a":7699,"v":642},{"m":"Mar 26","o":8,"a":5355,"v":669},{"m":"Apr 26","o":12,"a":10432,"v":869}],"Platform":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":2,"a":3094,"v":1547},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":2,"a":1982,"v":991},{"m":"Mar 26","o":1,"a":666,"v":666},{"m":"Apr 26","o":3,"a":1446,"v":482}],"Share":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":3,"a":2678,"v":893}]}},{"o":29,"a":21539,"v":743,"ns":7,"rs":22,"c":"United Arab Emirates","chs":[{"o":15,"a":5319,"v":355,"ns":0,"rs":15,"ch":"NULL"},{"o":6,"a":5614,"v":936,"ns":2,"rs":4,"ch":"CRM"},{"o":4,"a":8509,"v":2127,"ns":2,"rs":2,"ch":"Platform"},{"o":3,"a":1352,"v":451,"ns":2,"rs":1,"ch":"DM"},{"o":1,"a":744,"v":744,"ns":1,"rs":0,"ch":"Share"}],"tr":{"All":[{"m":"Oct 25","o":14,"a":7628,"v":545},{"m":"Nov 25","o":16,"a":7943,"v":496},{"m":"Dec 25","o":16,"a":14720,"v":920},{"m":"Jan 26","o":32,"a":27708,"v":866},{"m":"Feb 26","o":27,"a":17325,"v":642},{"m":"Mar 26","o":34,"a":28037,"v":825},{"m":"Apr 26","o":29,"a":21539,"v":743}],"NULL":[{"m":"Oct 25","o":5,"a":5,"v":1},{"m":"Nov 25","o":2,"a":812,"v":406},{"m":"Dec 25","o":5,"a":2407,"v":481},{"m":"Jan 26","o":3,"a":3078,"v":1026},{"m":"Feb 26","o":1,"a":100,"v":100},{"m":"Mar 26","o":5,"a":302,"v":60},{"m":"Apr 26","o":15,"a":5319,"v":355}],"DM":[{"m":"Oct 25","o":5,"a":4371,"v":874},{"m":"Nov 25","o":4,"a":1832,"v":458},{"m":"Dec 25","o":3,"a":8241,"v":2747},{"m":"Jan 26","o":16,"a":12284,"v":768},{"m":"Feb 26","o":18,"a":10885,"v":605},{"m":"Mar 26","o":18,"a":10114,"v":562},{"m":"Apr 26","o":3,"a":1352,"v":451}],"CRM":[{"m":"Oct 25","o":2,"a":1592,"v":796},{"m":"Nov 25","o":7,"a":4150,"v":593},{"m":"Dec 25","o":7,"a":3352,"v":479},{"m":"Jan 26","o":7,"a":3845,"v":549},{"m":"Feb 26","o":7,"a":5612,"v":802},{"m":"Mar 26","o":7,"a":4099,"v":586},{"m":"Apr 26","o":6,"a":5614,"v":936}],"Platform":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":2,"a":1049,"v":524},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":2,"a":5866,"v":2933},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":3,"a":8418,"v":2806},{"m":"Apr 26","o":4,"a":8509,"v":2127}],"Share":[{"m":"Oct 25","o":1,"a":712,"v":712},{"m":"Nov 25","o":1,"a":100,"v":100},{"m":"Dec 25","o":1,"a":720,"v":720},{"m":"Jan 26","o":1,"a":736,"v":736},{"m":"Feb 26","o":1,"a":728,"v":728},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":1,"a":744,"v":744}]}},{"o":10,"a":6922,"v":692,"ns":7,"rs":3,"c":"Australia","chs":[{"o":3,"a":1724,"v":575,"ns":2,"rs":1,"ch":"CRM"},{"o":3,"a":1922,"v":641,"ns":1,"rs":2,"ch":"NULL"},{"o":1,"a":657,"v":657,"ns":1,"rs":0,"ch":"DM"},{"o":1,"a":1316,"v":1316,"ns":1,"rs":0,"ch":"Platform"},{"o":1,"a":660,"v":660,"ns":1,"rs":0,"ch":"Share"},{"o":1,"a":643,"v":643,"ns":1,"rs":0,"ch":"Social Media Team"}],"tr":{"All":[{"m":"Oct 25","o":29,"a":23687,"v":817},{"m":"Nov 25","o":10,"a":6825,"v":682},{"m":"Dec 25","o":8,"a":5007,"v":626},{"m":"Jan 26","o":20,"a":13778,"v":689},{"m":"Feb 26","o":22,"a":16395,"v":745},{"m":"Mar 26","o":25,"a":22409,"v":896},{"m":"Apr 26","o":10,"a":6922,"v":692}],"DM":[{"m":"Oct 25","o":13,"a":10523,"v":809},{"m":"Nov 25","o":6,"a":4556,"v":759},{"m":"Dec 25","o":2,"a":1182,"v":591},{"m":"Jan 26","o":10,"a":6392,"v":639},{"m":"Feb 26","o":18,"a":13888,"v":772},{"m":"Mar 26","o":16,"a":13069,"v":817},{"m":"Apr 26","o":1,"a":657,"v":657}],"Platform":[{"m":"Oct 25","o":1,"a":5744,"v":5744},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":1,"a":886,"v":886},{"m":"Jan 26","o":2,"a":1676,"v":838},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":2,"a":4448,"v":2224},{"m":"Apr 26","o":1,"a":1316,"v":1316}],"CRM":[{"m":"Oct 25","o":8,"a":4279,"v":535},{"m":"Nov 25","o":4,"a":2268,"v":567},{"m":"Dec 25","o":4,"a":2350,"v":587},{"m":"Jan 26","o":6,"a":3933,"v":655},{"m":"Feb 26","o":4,"a":2507,"v":627},{"m":"Mar 26","o":5,"a":3603,"v":721},{"m":"Apr 26","o":3,"a":1724,"v":575}],"Share":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":2,"a":1288,"v":644},{"m":"Apr 26","o":1,"a":660,"v":660}],"NULL":[{"m":"Oct 25","o":5,"a":884,"v":177},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":1,"a":589,"v":589},{"m":"Jan 26","o":2,"a":1777,"v":889},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":3,"a":1922,"v":641}],"Social Media Team":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":1,"a":643,"v":643}]}},{"o":7,"a":1500,"v":214,"ns":5,"rs":2,"c":"Saudi Arabia","chs":[{"o":2,"a":400,"v":200,"ns":2,"rs":0,"ch":"DM"},{"o":2,"a":200,"v":100,"ns":0,"rs":2,"ch":"Platform"},{"o":1,"a":100,"v":100,"ns":1,"rs":0,"ch":"CRM"},{"o":1,"a":500,"v":500,"ns":1,"rs":0,"ch":"NULL"},{"o":1,"a":300,"v":300,"ns":1,"rs":0,"ch":"Update"}],"tr":{"All":[{"m":"Oct 25","o":4,"a":502,"v":126},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":3,"a":501,"v":167},{"m":"Jan 26","o":2,"a":101,"v":50},{"m":"Feb 26","o":7,"a":6286,"v":898},{"m":"Mar 26","o":8,"a":11359,"v":1420},{"m":"Apr 26","o":7,"a":1500,"v":214}],"DM":[{"m":"Oct 25","o":2,"a":500,"v":250},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":2,"a":500,"v":250},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":4,"a":2701,"v":675},{"m":"Mar 26","o":4,"a":3878,"v":970},{"m":"Apr 26","o":2,"a":400,"v":200}],"CRM":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":3,"a":3585,"v":1195},{"m":"Mar 26","o":1,"a":1,"v":1},{"m":"Apr 26","o":1,"a":100,"v":100}],"NULL":[{"m":"Oct 25","o":2,"a":2,"v":1},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":1,"a":1,"v":1},{"m":"Jan 26","o":2,"a":101,"v":50},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":1,"a":100,"v":100},{"m":"Apr 26","o":1,"a":500,"v":500}],"Update":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":1,"a":300,"v":300}],"Platform":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":1,"a":7280,"v":7280},{"m":"Apr 26","o":2,"a":200,"v":100}]}},{"o":5,"a":9785,"v":1957,"ns":1,"rs":4,"c":"Ireland","chs":[{"o":4,"a":8182,"v":2045,"ns":0,"rs":4,"ch":"DM"},{"o":1,"a":1603,"v":1603,"ns":1,"rs":0,"ch":"CRM"}],"tr":{"All":[{"m":"Oct 25","o":1,"a":1534,"v":1534},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":1,"a":100,"v":100},{"m":"Feb 26","o":2,"a":3181,"v":1591},{"m":"Mar 26","o":4,"a":2962,"v":740},{"m":"Apr 26","o":5,"a":9785,"v":1957}],"DM":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":2,"a":3181,"v":1591},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":4,"a":8182,"v":2045}],"CRM":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":4,"a":2962,"v":740},{"m":"Apr 26","o":1,"a":1603,"v":1603}]}},{"o":3,"a":2481,"v":827,"ns":3,"rs":0,"c":"United Kingdom","chs":[{"o":2,"a":2181,"v":1090,"ns":2,"rs":0,"ch":"DM"},{"o":1,"a":300,"v":300,"ns":1,"rs":0,"ch":"Update"}],"tr":{"All":[{"m":"Oct 25","o":7,"a":20200,"v":2886},{"m":"Nov 25","o":7,"a":6787,"v":970},{"m":"Dec 25","o":11,"a":11754,"v":1069},{"m":"Jan 26","o":5,"a":6721,"v":1344},{"m":"Feb 26","o":11,"a":14907,"v":1355},{"m":"Mar 26","o":5,"a":6956,"v":1391},{"m":"Apr 26","o":3,"a":2481,"v":827}],"DM":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":1,"a":300,"v":300},{"m":"Dec 25","o":2,"a":400,"v":200},{"m":"Jan 26","o":1,"a":1844,"v":1844},{"m":"Feb 26","o":3,"a":4415,"v":1472},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":2,"a":2181,"v":1090}],"Update":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":0,"a":0,"v":0},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":1,"a":300,"v":300}]}},{"o":3,"a":300,"v":100,"ns":2,"rs":1,"c":"Kuwait","chs":[{"o":2,"a":200,"v":100,"ns":2,"rs":0,"ch":"DM"},{"o":1,"a":100,"v":100,"ns":0,"rs":1,"ch":"NULL"}],"tr":{"All":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":3,"a":501,"v":167},{"m":"Dec 25","o":4,"a":4505,"v":1126},{"m":"Jan 26","o":1,"a":1,"v":1},{"m":"Feb 26","o":5,"a":2483,"v":497},{"m":"Mar 26","o":1,"a":1,"v":1},{"m":"Apr 26","o":3,"a":300,"v":100}],"NULL":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":1,"a":1,"v":1},{"m":"Dec 25","o":1,"a":300,"v":300},{"m":"Jan 26","o":1,"a":1,"v":1},{"m":"Feb 26","o":1,"a":1,"v":1},{"m":"Mar 26","o":1,"a":1,"v":1},{"m":"Apr 26","o":1,"a":100,"v":100}],"DM":[{"m":"Oct 25","o":0,"a":0,"v":0},{"m":"Nov 25","o":0,"a":0,"v":0},{"m":"Dec 25","o":3,"a":4205,"v":1402},{"m":"Jan 26","o":0,"a":0,"v":0},{"m":"Feb 26","o":2,"a":400,"v":200},{"m":"Mar 26","o":0,"a":0,"v":0},{"m":"Apr 26","o":2,"a":200,"v":100}]}},{"o":2,"a":4314,"v":2157,"ns":0,"rs":2,"c":"Singapore","chs":[{"o":2,"a":4314,"v":2157,"ns":0,"rs":2,"ch":"CRM"}],"tr":{"All":[{"m":"Oct 25","o":4,"a":11768,"v":2942},{"m":"Nov 25","o":4,"a":800,"v":200},{"m":"Dec 25","o":4,"a":6559,"v":1640},{"m":"Jan 26","o":3,"a":5503,"v":1834},{"m":"Feb 26","o":6,"a":12073,"v":2012},{"m":"Mar 26","o":4,"a":12944,"v":3236},{"m":"Apr 26","o":2,"a":4314,"v":2157}],"CRM":[{"m":"Oct 25","o":1,"a":3037,"v":3037},{"m":"Nov 25","o":1,"a":100,"v":100},{"m":"Dec 25","o":3,"a":6459,"v":2153},{"m":"Jan 26","o":1,"a":3130,"v":3130},{"m":"Feb 26","o":0,"a":0,"v":0},{"m":"Mar 26","o":1,"a":3249,"v":3249},{"m":"Apr 26","o":2,"a":4314,"v":2157}]}}],"cd":{"DM":[{"s":"external_GHI","d":"fbad_GHI","c":{"o":82,"a":40623,"v":495,"ns":66,"rs":16},"p":{"o":75,"a":27446,"v":366,"ns":65,"rs":10},"a3":{"o":84.3,"a":35558,"v":422,"ns":68.3,"rs":16.0},"a6":{"o":74.7,"a":29799,"v":399,"ns":62.0,"rs":12.7}},{"s":"external_Ketto","d":"google-search","c":{"o":45,"a":8446,"v":188,"ns":10,"rs":35},"p":{"o":37,"a":4009,"v":108,"ns":8,"rs":29},"a3":{"o":43.7,"a":6052,"v":139,"ns":13.7,"rs":30.0},"a6":{"o":44.3,"a":6214,"v":140,"ns":12.5,"rs":31.8}},{"s":"external_Ketto","d":"demgen","c":{"o":32,"a":17215,"v":538,"ns":31,"rs":1},"p":{"o":53,"a":24447,"v":461,"ns":46,"rs":7},"a3":{"o":35.3,"a":16516,"v":467,"ns":30.3,"rs":5.0},"a6":{"o":17.7,"a":8258,"v":467,"ns":15.2,"rs":2.5}},{"s":"external_DFH2","d":"fbad_DFH2","c":{"o":31,"a":7246,"v":234,"ns":23,"rs":8},"p":{"o":26,"a":6634,"v":255,"ns":20,"rs":6},"a3":{"o":32.7,"a":13751,"v":421,"ns":25.0,"rs":7.7},"a6":{"o":24.0,"a":10413,"v":434,"ns":18.2,"rs":5.8}},{"s":"external_DTC","d":"fbad_DTC","c":{"o":22,"a":17560,"v":798,"ns":16,"rs":6},"p":{"o":27,"a":11629,"v":431,"ns":25,"rs":2},"a3":{"o":23.3,"a":19150,"v":821,"ns":18.3,"rs":5.0},"a6":{"o":19.3,"a":12359,"v":639,"ns":15.5,"rs":3.8}},{"s":"external_GFC","d":"fbad_GFC","c":{"o":8,"a":1100,"v":138,"ns":7,"rs":1},"p":{"o":1,"a":100,"v":100,"ns":0,"rs":1},"a3":{"o":6.7,"a":1233,"v":185,"ns":5.7,"rs":1.0},"a6":{"o":5.7,"a":1100,"v":194,"ns":4.8,"rs":0.8}},{"s":"external_GHI","d":"taboola_ghi","c":{"o":2,"a":200,"v":100,"ns":1,"rs":1},"p":{"o":1,"a":300,"v":300,"ns":1,"rs":0},"a3":{"o":1.0,"a":445,"v":445,"ns":1.0,"rs":0.0},"a6":{"o":0.5,"a":223,"v":445,"ns":0.5,"rs":0.0}},{"s":"foundation_edge","d":"WID6883268fdc734RkoEY","c":{"o":2,"a":4040,"v":2020,"ns":1,"rs":1},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}}],"NULL":[{"s":"(not set)","d":"(not set)","c":{"o":216,"a":55879,"v":259,"ns":46,"rs":170},"p":{"o":239,"a":49142,"v":206,"ns":47,"rs":192},"a3":{"o":255.0,"a":40559,"v":159,"ns":55.3,"rs":199.7},"a6":{"o":254.5,"a":35575,"v":140,"ns":51.0,"rs":203.5}}],"CRM":[{"s":"external_ct","d":"whatsapp","c":{"o":57,"a":25806,"v":453,"ns":45,"rs":12},"p":{"o":69,"a":28805,"v":417,"ns":64,"rs":5},"a3":{"o":44.0,"a":22329,"v":507,"ns":41.0,"rs":3.0},"a6":{"o":45.3,"a":22545,"v":497,"ns":40.2,"rs":5.2}},{"s":"pmm_postip_ct","d":"whatsapp","c":{"o":32,"a":11962,"v":374,"ns":6,"rs":26},"p":{"o":51,"a":7285,"v":143,"ns":9,"rs":42},"a3":{"o":35.0,"a":7961,"v":227,"ns":6.0,"rs":29.0},"a6":{"o":36.5,"a":7124,"v":195,"ns":6.7,"rs":29.8}},{"s":"external_ct","d":"email","c":{"o":19,"a":13089,"v":689,"ns":16,"rs":3},"p":{"o":54,"a":34036,"v":630,"ns":47,"rs":7},"a3":{"o":65.7,"a":36307,"v":553,"ns":58.7,"rs":7.0},"a6":{"o":61.5,"a":33359,"v":542,"ns":53.2,"rs":8.3}},{"s":"external_ct","d":"sms","c":{"o":13,"a":13370,"v":1028,"ns":9,"rs":4},"p":{"o":9,"a":5756,"v":640,"ns":8,"rs":1},"a3":{"o":6.7,"a":2619,"v":393,"ns":5.7,"rs":1.0},"a6":{"o":6.2,"a":1916,"v":311,"ns":5.5,"rs":0.7}},{"s":"external_ct","d":"email_ct","c":{"o":6,"a":2502,"v":417,"ns":5,"rs":1},"p":{"o":4,"a":1400,"v":350,"ns":4,"rs":0},"a3":{"o":3.0,"a":2299,"v":766,"ns":3.0,"rs":0.0},"a6":{"o":2.8,"a":1558,"v":550,"ns":2.8,"rs":0.0}},{"s":"pmm_postip_ct","d":"email","c":{"o":3,"a":1130,"v":377,"ns":0,"rs":3},"p":{"o":10,"a":3659,"v":366,"ns":1,"rs":9},"a3":{"o":8.0,"a":2498,"v":312,"ns":1.0,"rs":7.0},"a6":{"o":9.2,"a":3448,"v":376,"ns":1.2,"rs":8.0}},{"s":"pmm_postip_ct","d":"whatsapp_ct","c":{"o":3,"a":300,"v":100,"ns":0,"rs":3},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":1.3,"a":1,"v":1,"ns":0.0,"rs":1.3},"a6":{"o":2.3,"a":480,"v":206,"ns":0.8,"rs":1.5}},{"s":"external_ct","d":"whatsapp_profile","c":{"o":1,"a":100,"v":100,"ns":0,"rs":1},"p":{"o":3,"a":2214,"v":738,"ns":1,"rs":2},"a3":{"o":1.7,"a":920,"v":552,"ns":1.0,"rs":0.7},"a6":{"o":1.5,"a":834,"v":556,"ns":1.0,"rs":0.5}}],"Platform":[{"s":"internal_Ketto","d":"(not set)","c":{"o":40,"a":25964,"v":649,"ns":33,"rs":7},"p":{"o":43,"a":34757,"v":808,"ns":34,"rs":9},"a3":{"o":44.7,"a":21708,"v":486,"ns":33.7,"rs":11.0},"a6":{"o":45.0,"a":20733,"v":461,"ns":35.3,"rs":9.7}},{"s":"internal_Ketto","d":"homepage","c":{"o":29,"a":16507,"v":569,"ns":25,"rs":4},"p":{"o":33,"a":29058,"v":881,"ns":30,"rs":3},"a3":{"o":34.0,"a":23863,"v":702,"ns":27.0,"rs":7.0},"a6":{"o":30.3,"a":20974,"v":691,"ns":21.7,"rs":8.7}},{"s":"internal_ketto","d":"home","c":{"o":12,"a":4530,"v":378,"ns":7,"rs":5},"p":{"o":10,"a":10548,"v":1055,"ns":4,"rs":6},"a3":{"o":13.0,"a":6191,"v":476,"ns":4.3,"rs":8.7},"a6":{"o":10.7,"a":5130,"v":481,"ns":4.2,"rs":6.5}},{"s":"internal","d":"copy","c":{"o":10,"a":2000,"v":200,"ns":10,"rs":0},"p":{"o":1,"a":300,"v":300,"ns":1,"rs":0},"a3":{"o":2.0,"a":300,"v":150,"ns":2.0,"rs":0.0},"a6":{"o":1.2,"a":150,"v":129,"ns":1.0,"rs":0.2}},{"s":"organic","d":"EndedCampaignPage","c":{"o":7,"a":2961,"v":423,"ns":1,"rs":6},"p":{"o":8,"a":3215,"v":402,"ns":4,"rs":4},"a3":{"o":6.7,"a":3374,"v":506,"ns":2.0,"rs":4.7},"a6":{"o":5.8,"a":2411,"v":413,"ns":1.3,"rs":4.5}},{"s":"whatsapp_live_agent","d":"whatsapp","c":{"o":2,"a":350,"v":175,"ns":0,"rs":2},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0.3,"a":33,"v":100,"ns":0.0,"rs":0.3},"a6":{"o":0.2,"a":17,"v":100,"ns":0.0,"rs":0.2}},{"s":"internal_Ketto","d":"EndedCampaignPage","c":{"o":1,"a":930,"v":930,"ns":0,"rs":1},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0.7,"a":910,"v":1365,"ns":0.3,"rs":0.3},"a6":{"o":0.3,"a":455,"v":1365,"ns":0.2,"rs":0.2}},{"s":"utm_internal","d":"Homepage","c":{"o":1,"a":200,"v":200,"ns":0,"rs":1},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0.5,"a":485,"v":970,"ns":0.3,"rs":0.2}}],"Share":[{"s":"internal","d":"whatsapp_share","c":{"o":24,"a":7734,"v":322,"ns":23,"rs":1},"p":{"o":10,"a":2046,"v":205,"ns":10,"rs":0},"a3":{"o":6.3,"a":1116,"v":176,"ns":5.3,"rs":1.0},"a6":{"o":6.0,"a":1160,"v":193,"ns":5.5,"rs":0.5}},{"s":"internal","d":"Whatsapp_share","c":{"o":22,"a":6239,"v":284,"ns":18,"rs":4},"p":{"o":6,"a":1243,"v":207,"ns":6,"rs":0},"a3":{"o":2.0,"a":414,"v":207,"ns":2.0,"rs":0.0},"a6":{"o":1.0,"a":207,"v":207,"ns":1.0,"rs":0.0}},{"s":"campaigner_ct","d":"whatsapp_share","c":{"o":5,"a":1000,"v":200,"ns":4,"rs":1},"p":{"o":3,"a":500,"v":167,"ns":3,"rs":0},"a3":{"o":2.7,"a":400,"v":150,"ns":2.7,"rs":0.0},"a6":{"o":2.2,"a":587,"v":271,"ns":2.2,"rs":0.0}},{"s":"external_Ketto","d":"whatsapp_share","c":{"o":4,"a":1933,"v":483,"ns":4,"rs":0},"p":{"o":1,"a":300,"v":300,"ns":1,"rs":0},"a3":{"o":2.3,"a":433,"v":186,"ns":2.3,"rs":0.0},"a6":{"o":1.8,"a":556,"v":303,"ns":1.8,"rs":0.0}},{"s":"external_Ketto","d":"Whatsapp_share","c":{"o":3,"a":500,"v":167,"ns":3,"rs":0},"p":{"o":1,"a":100,"v":100,"ns":1,"rs":0},"a3":{"o":0.3,"a":33,"v":100,"ns":0.3,"rs":0.0},"a6":{"o":0.2,"a":17,"v":100,"ns":0.2,"rs":0.0}},{"s":"external_Ketto","d":"whatsappShare","c":{"o":2,"a":200,"v":100,"ns":2,"rs":0},"p":{"o":4,"a":800,"v":200,"ns":4,"rs":0},"a3":{"o":4.3,"a":501,"v":116,"ns":3.3,"rs":1.0},"a6":{"o":4.8,"a":1036,"v":214,"ns":4.3,"rs":0.5}},{"s":"404Page","d":"whatsapp_share","c":{"o":1,"a":300,"v":300,"ns":1,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}},{"s":"campaigner_ct","d":"Insta_share","c":{"o":1,"a":100,"v":100,"ns":1,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}}],"Update":[{"s":"update_ct_admin-95325","d":"email","c":{"o":2,"a":400,"v":200,"ns":2,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}},{"s":"update_ct_admin-95351","d":"email","c":{"o":2,"a":350,"v":175,"ns":1,"rs":1},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}},{"s":"update_ct_admin-95534","d":"whatsapp_ct","c":{"o":2,"a":300,"v":150,"ns":2,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}},{"s":"update_ct_admin-95337","d":"email","c":{"o":1,"a":300,"v":300,"ns":1,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}},{"s":"update_ct_admin-95337","d":"whatsapp_ct","c":{"o":1,"a":200,"v":200,"ns":1,"rs":0},"p":{"o":2,"a":200,"v":100,"ns":2,"rs":0},"a3":{"o":0.7,"a":67,"v":100,"ns":0.7,"rs":0.0},"a6":{"o":0.3,"a":33,"v":100,"ns":0.3,"rs":0.0}},{"s":"update_ct_admin-95368","d":"email","c":{"o":1,"a":500,"v":500,"ns":1,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}},{"s":"update_ct_admin-95431","d":"whatsapp_ct","c":{"o":1,"a":200,"v":200,"ns":1,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}},{"s":"update_ct_admin-95539","d":"whatsapp_ct","c":{"o":1,"a":100,"v":100,"ns":1,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}}],"Social Media Team":[{"s":"internal_Ketto","d":"fbnew","c":{"o":1,"a":643,"v":643,"ns":1,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}},{"s":"internal_Ketto","d":"fborg","c":{"o":1,"a":300,"v":300,"ns":1,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0,"a":0,"v":0,"ns":0,"rs":0}},{"s":"internal_Ketto","d":"iganimalsip","c":{"o":1,"a":100,"v":100,"ns":0,"rs":1},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0.3,"a":323,"v":970,"ns":0.3,"rs":0.0},"a6":{"o":0.8,"a":262,"v":314,"ns":0.5,"rs":0.3}},{"s":"internal_Ketto","d":"igedu","c":{"o":1,"a":100,"v":100,"ns":0,"rs":1},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0.3,"a":50,"v":150,"ns":0.2,"rs":0.2}},{"s":"internal_Ketto","d":"igeldersip","c":{"o":1,"a":100,"v":100,"ns":0,"rs":1},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0.2,"a":880,"v":5280,"ns":0.0,"rs":0.2}},{"s":"internal_Ketto","d":"ighungersip","c":{"o":1,"a":100,"v":100,"ns":0,"rs":1},"p":{"o":1,"a":300,"v":300,"ns":1,"rs":0},"a3":{"o":0.3,"a":100,"v":300,"ns":0.3,"rs":0.0},"a6":{"o":0.5,"a":167,"v":333,"ns":0.3,"rs":0.2}},{"s":"internal_Ketto","d":"insip","c":{"o":1,"a":100,"v":100,"ns":1,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0.3,"a":67,"v":200,"ns":0.0,"rs":0.3},"a6":{"o":0.2,"a":33,"v":200,"ns":0.0,"rs":0.2}}],"SEO":[{"s":"Google","d":"GMB","c":{"o":1,"a":300,"v":300,"ns":1,"rs":0},"p":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a3":{"o":0,"a":0,"v":0,"ns":0,"rs":0},"a6":{"o":0.5,"a":0,"v":1,"ns":0.0,"rs":0.5}},{"s":"sip_blog_menu","d":"blog_nav_menu","c":{"o":1,"a":1516,"v":1516,"ns":1,"rs":0},"p":{"o":2,"a":3126,"v":1563,"ns":2,"rs":0},"a3":{"o":1.3,"a":2775,"v":2081,"ns":1.3,"rs":0.0},"a6":{"o":2.5,"a":2852,"v":1141,"ns":2.0,"rs":0.5}}],"Referral":[{"s":"internal_referral","d":"whatsapp","c":{"o":2,"a":150,"v":75,"ns":1,"rs":1},"p":{"o":1,"a":500,"v":500,"ns":1,"rs":0},"a3":{"o":0.7,"a":200,"v":300,"ns":0.7,"rs":0.0},"a6":{"o":0.7,"a":150,"v":225,"ns":0.7,"rs":0.0}}]}};

// ══════════════════════════════════════════════════════════════════════════════
// CONSTANTS & UTILITIES
// ══════════════════════════════════════════════════════════════════════════════
const CC={"DM":"#7c3aed","SEO":"#0ea5e9","CRM":"#059669","Social Media Team":"#db2777","Share":"#f59e0b","Platform":"#14b8a6","Update":"#64748b","Referral":"#84cc16","NULL":"#8b5cf6","Others":"#a3a3a3","Total":"#0f172a"};
const MAIN_CHS=["DM","NULL","CRM","Platform","Share","Update","Social Media Team","SEO","Referral"];
const ALL_CHS=D.chs;
const COUNTRIES_LIST=["All","India","United States","Canada","United Arab Emirates","Australia"];
const OT_LIST=["All","normal_order","main_order"];
const OT_LABELS={"All":"All Orders","normal_order":"Normal Order","main_order":"Main Order"};

const f={fontFamily:"'DM Sans',sans-serif"};
const fmt=n=>n>=10000000?`₹${(n/10000000).toFixed(2)}Cr`:n>=100000?`₹${(n/100000).toFixed(1)}L`:n>=1000?`₹${(n/1000).toFixed(1)}K`:`₹${Math.round(n)}`;
const fN=n=>typeof n==='number'?(n>=1000?`${(n/1000).toFixed(1)}K`:String(Math.round(n))):n;
const pct=(c,b)=>b&&b!==0?((c-b)/b*100).toFixed(1):null;
const tt={background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,fontSize:11,...f,boxShadow:"0 4px 12px rgba(0,0,0,.08)"};
const cd={background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:"18px 20px"};

// Common small components
function Pill({label,active,onClick,color="#0f172a"}){
  return <button onClick={onClick} style={{...f,padding:"5px 14px",borderRadius:20,border:`1.5px solid ${active?color:"#e2e8f0"}`,background:active?color+"16":"#fff",color:active?color:"#64748b",cursor:"pointer",fontSize:11,fontWeight:active?600:400,transition:"all .12s"}}>{label}</button>;
}
function Dt({c,b,s=11,label}){
  const p=pct(c,b);if(!p)return<span style={{...f,fontSize:s,color:"#94a3b8"}}>—</span>;
  const u=parseFloat(p)>=0;
  return<span style={{display:"inline-flex",alignItems:"center",gap:3}}>
    <span style={{...f,fontSize:s,color:u?"#059669":"#ef4444",fontWeight:600}}>{u?"▲":"▼"}{Math.abs(p)}%</span>
    {label&&<span style={{...f,fontSize:Math.max(s-1,9),color:"#94a3b8"}}>{label}</span>}
  </span>;
}
function TabBtn({label,active,onClick}){
  return<button onClick={onClick} style={{...f,padding:"10px 20px",border:"none",borderBottom:active?"2.5px solid #0f172a":"2.5px solid transparent",background:"transparent",color:active?"#0f172a":"#94a3b8",cursor:"pointer",fontSize:13,fontWeight:active?600:400}}>{label}</button>;
}
// Filter pill: shows "Showing: X ✕" when filter is active, with click to clear
function FilterPill({label,color,onClear}){
  return<div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"4px 6px 4px 12px",borderRadius:20,background:color+"14",border:`1.5px solid ${color}`,...f,fontSize:11,fontWeight:600,color}}>
    <span style={{display:"inline-flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:"50%",background:color,display:"inline-block"}}/>Showing: {label}</span>
    <button onClick={onClear} style={{border:"none",background:color,color:"#fff",width:18,height:18,borderRadius:"50%",cursor:"pointer",fontSize:11,lineHeight:1,padding:0,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>✕</button>
  </div>;
}
// Clickable legend: renders the legend with click handlers per item
function ClickableLegend({items,onClick,selected,getColor}){
  return <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginTop:8}}>
    {items.map(it=>{
      const c=getColor(it);
      const isDim=selected&&selected!==it;
      return<div key={it} onClick={()=>onClick(it)} style={{display:"inline-flex",alignItems:"center",gap:6,cursor:"pointer",padding:"3px 10px",borderRadius:20,background:selected===it?c+"14":"transparent",border:`1px solid ${selected===it?c:"transparent"}`,opacity:isDim?0.4:1,transition:"all .12s"}}>
        <span style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block"}}/>
        <span style={{...f,fontSize:10,color:selected===it?c:"#64748b",fontWeight:selected===it?600:400}}>{it}</span>
      </div>;
    })}
  </div>;
}
const barLabel=(clr="#0f172a",inside=false)=>({position:inside?"inside":"top",fontSize:10,fill:inside?"#fff":clr,...f});

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1: SIP PULSE & BENCHMARKS
// ══════════════════════════════════════════════════════════════════════════════
function PulseTab(){
  const[view,setView]=useState("all");
  const[mk,setMk]=useState("orders");
  const[asvCountry,setAsvCountry]=useState("All");
  const[asvOT,setAsvOT]=useState("All");
  const[asvChs,setAsvChs]=useState(["All",...MAIN_CHS.slice(0,4)]);
  const[pulseChannelFilter,setPulseChannelFilter]=useState(null);
  const[pulseTelFilter,setPulseTelFilter]=useState(null);

  // 1. Pulse bar data
  const pulseData=D.pulse.map((p,i)=>{
    const prev=i>0?D.pulse[i-1]:null;
    if(mk==="orders"){
      const t=view==="tel"?p.to:view==="non_tel"?p.no:p.to+p.no;
      const ntMoM=prev?pct(p.no,prev.no):null;
      return{m:p.m,Tel:view!=="non_tel"?p.to:0,NonTel:view!=="tel"?p.no:0,total:t,ntMoM};
    }
    return{m:p.m,Tel:view!=="non_tel"?Math.round(p.ta/1000):0,NonTel:view!=="tel"?Math.round(p.na/1000):0,total:Math.round((view==="tel"?p.ta:view==="non_tel"?p.na:(p.ta+p.na))/1000)};
  });

  // 2. Channel stack
  const stackData=D.cs.map(r=>{
    const row={m:r.m};
    MAIN_CHS.forEach(ch=>{row[ch]=mk==="orders"?(r[ch]||0):Math.round((r[ch+'_a']||0)/1000)});
    return row;
  });

  // 3. ASV data by country + order type
  const asvSrc = asvCountry!=="All" && D.asvC[asvCountry] ? D.asvC[asvCountry] : (asvOT!=="All" && D.asvO[asvOT] ? D.asvO[asvOT] : D.asv);
  const asvData = asvSrc.map(r=>{
    const row={m:r.m||D.ml[r.m]||r.m};
    asvChs.forEach(ch=>{row[ch]=r[ch]||0});
    return row;
  });

  // 4. Benchmark table
  const chb=D.chb;
  const benchRows=[...MAIN_CHS,"Total"];

  return(
    <div>
      {/* ── SECTION 1: SIP PULSE ──────────────────────────────────────────── */}
      <div style={{...cd,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{...f,fontSize:15,fontWeight:700,color:"#0f172a"}}>SIP Acquisition Pulse</div>
            <div style={{...f,fontSize:12,color:"#94a3b8"}}>7 months · Telecalling vs Non-Telecalling · Numbers on bars</div>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
            {[["all","All"],["non_tel","Non-Tel"],["tel","Telecalling"]].map(([k,l])=>
              <Pill key={k} label={l} active={view===k} onClick={()=>setView(k)}/>
            )}
            <div style={{width:1,height:22,background:"#e2e8f0",margin:"0 4px"}}/>
            {[["orders","Orders"],["amount","Amount (₹K)"]].map(([k,l])=>
              <Pill key={k} label={l} active={mk===k} onClick={()=>setMk(k)} color="#7c3aed"/>
            )}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pulseData} margin={{left:10,right:10,top:30,bottom:0}} barSize={view==="all"?42:56}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="m" tick={{fill:"#64748b",fontSize:12,...f}}/>
            <YAxis tick={{fill:"#94a3b8",fontSize:10}}/>
            <Tooltip contentStyle={tt} formatter={v=>mk==="amount"?`₹${v}K`:v}/>
            {view!=="non_tel"&&(!pulseTelFilter||pulseTelFilter==="Tel")&&<Bar dataKey="Tel" stackId="a" fill="#f97316" label={(view==="tel"||pulseTelFilter==="Tel")?{position:"top",fontSize:11,fill:"#f97316",fontWeight:600,...f}:{position:"inside",fontSize:11,fill:"#fff",fontWeight:600,...f}}/>}
            {view!=="tel"&&(!pulseTelFilter||pulseTelFilter==="NonTel")&&<Bar dataKey="NonTel" stackId="a" fill="#0f172a" radius={[3,3,0,0]} label={{position:"top",fontSize:11,fill:"#0f172a",fontWeight:600,...f}}/>}
          </BarChart>
        </ResponsiveContainer>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6,flexWrap:"wrap",gap:8}}>
          <div>
            {pulseTelFilter&&<FilterPill label={pulseTelFilter==="Tel"?"Telecalling":"Non-Telecalling"} color={pulseTelFilter==="Tel"?"#f97316":"#0f172a"} onClear={()=>setPulseTelFilter(null)}/>}
          </div>
          <div style={{display:"flex",gap:8}}>
            {(view==="all"||view==="tel")&&<div onClick={()=>setPulseTelFilter(pulseTelFilter==="Tel"?null:"Tel")} style={{display:"inline-flex",alignItems:"center",gap:6,cursor:"pointer",padding:"3px 10px",borderRadius:20,background:pulseTelFilter==="Tel"?"#f9731614":"transparent",border:`1px solid ${pulseTelFilter==="Tel"?"#f97316":"transparent"}`,opacity:(pulseTelFilter&&pulseTelFilter!=="Tel")?0.4:1}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:"#f97316"}}/>
              <span style={{...f,fontSize:11,color:"#64748b"}}>Telecalling</span>
            </div>}
            {(view==="all"||view==="non_tel")&&<div onClick={()=>setPulseTelFilter(pulseTelFilter==="NonTel"?null:"NonTel")} style={{display:"inline-flex",alignItems:"center",gap:6,cursor:"pointer",padding:"3px 10px",borderRadius:20,background:pulseTelFilter==="NonTel"?"#0f172a14":"transparent",border:`1px solid ${pulseTelFilter==="NonTel"?"#0f172a":"transparent"}`,opacity:(pulseTelFilter&&pulseTelFilter!=="NonTel")?0.4:1}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:"#0f172a"}}/>
              <span style={{...f,fontSize:11,color:"#64748b"}}>Non-Telecalling</span>
            </div>}
          </div>
        </div>
        {view==="all"&&(
          <div style={{display:"flex",gap:20,justifyContent:"center",marginTop:10}}>
            {D.pulse.slice(-1).map(p=>(
              <div key="latest" style={{display:"flex",gap:20,...f,fontSize:12}}>
                <span style={{color:"#f97316"}}>Tel: <b>{fN(p.to)}</b></span>
                <span style={{color:"#0f172a"}}>Non-Tel: <b>{fN(p.no)}</b></span>
                <span style={{color:"#64748b"}}>Total: <b>{fN(p.to+p.no)}</b></span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── SECTION 2.1: CHANNEL SPLIT STACKED ────────────────────────────── */}
      <div style={{...cd,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{...f,fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:2}}>Non-Telecalling — Channel Split Over Time</div>
            <div style={{...f,fontSize:12,color:"#94a3b8"}}>Stacked · {mk==="orders"?"Order count":"Amount (₹K)"} per channel per month · % share within month · Click legend to filter</div>
          </div>
          {pulseChannelFilter&&<FilterPill label={pulseChannelFilter} color={CC[pulseChannelFilter]||"#0f172a"} onClear={()=>setPulseChannelFilter(null)}/>}
        </div>
        <ResponsiveContainer width="100%" height={440}>
          <BarChart data={stackData} margin={{left:10,right:60,top:10,bottom:0}} barSize={56}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="m" tick={{fill:"#64748b",fontSize:12,...f}}/>
            <YAxis tick={{fill:"#94a3b8",fontSize:10}}/>
            <Tooltip contentStyle={tt} formatter={v=>mk==="amount"?`₹${v}K`:v}/>
            {MAIN_CHS.filter(ch=>!pulseChannelFilter||ch===pulseChannelFilter).map((ch,i,arr)=>(
              <Bar key={ch} dataKey={ch} stackId="a" fill={CC[ch]} radius={i===arr.length-1?[3,3,0,0]:[0,0,0,0]}
                label={(props)=>{
                  const{x,y,width,height,value,index}=props;
                  if(!value||value===0)return null;
                  const total=pulseChannelFilter?value:MAIN_CHS.reduce((s,c)=>s+(stackData[index]?.[c]||0),0);
                  const p=total>0?((value/total)*100):0;
                  if(p<1)return null;
                  const isSmall=height<22;
                  const txt=pulseChannelFilter?fN(value):(p>=10?`${Math.round(p)}%`:`${p.toFixed(1)}%`);
                  if(isSmall){
                    return<text x={x+width+4} y={y+height/2+3} fontSize={9} fill={CC[ch]} style={f} fontWeight={600}>{txt}</text>;
                  }
                  return<text x={x+width/2} y={y+height/2+3} textAnchor="middle" fontSize={10} fill="#fff" style={f} fontWeight={600}>{txt}</text>;
                }}/>
            ))}
          </BarChart>
        </ResponsiveContainer>
        <ClickableLegend items={MAIN_CHS} onClick={(ch)=>setPulseChannelFilter(pulseChannelFilter===ch?null:ch)} selected={pulseChannelFilter} getColor={(ch)=>CC[ch]||"#94a3b8"}/>
      </div>

      {/* ── SECTION 2.2: ASV BY CHANNEL ───────────────────────────────────── */}
      <div style={{...cd,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{...f,fontSize:15,fontWeight:700,color:"#0f172a"}}>ASV Trend by Channel (₹)</div>
            <div style={{...f,fontSize:12,color:"#94a3b8"}}>Total Donation ÷ Total Orders · Filter by Country & Order Type</div>
          </div>
        </div>
        <div style={{display:"flex",gap:16,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span style={{...f,fontSize:10,color:"#94a3b8",fontWeight:600,textTransform:"uppercase"}}>Country</span>
            {COUNTRIES_LIST.map(c=><Pill key={c} label={c==="All"?"All Countries":c} active={asvCountry===c} onClick={()=>{setAsvCountry(c);if(c!=="All")setAsvOT("All");}} color="#0ea5e9"/>)}
          </div>
          <div style={{width:1,height:22,background:"#e2e8f0"}}/>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span style={{...f,fontSize:10,color:"#94a3b8",fontWeight:600,textTransform:"uppercase"}}>Order Type</span>
            {OT_LIST.map(k=><Pill key={k} label={OT_LABELS[k]} active={asvOT===k} onClick={()=>{setAsvOT(k);if(k!=="All")setAsvCountry("All");}} color="#db2777"/>)}
          </div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
          <span style={{...f,fontSize:10,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",lineHeight:"28px"}}>Channels</span>
          {["All",...MAIN_CHS].map(ch=>{
            const active=asvChs.includes(ch);
            return<button key={ch} onClick={()=>{if(ch==="All"){setAsvChs(active?MAIN_CHS.slice(0,3):["All",...MAIN_CHS.slice(0,4)]);}else{const next=active?asvChs.filter(c=>c!==ch&&c!=="All"):[...asvChs.filter(c=>c!=="All"),ch];setAsvChs(next.length?next:["All"]);}}} style={{...f,padding:"3px 10px",borderRadius:16,border:`1px solid ${active?(CC[ch]||"#0f172a"):"#e2e8f0"}`,background:active?(CC[ch]||"#0f172a")+"16":"#fff",color:active?(CC[ch]||"#0f172a"):"#94a3b8",cursor:"pointer",fontSize:10,fontWeight:active?600:400}}>{ch==="All"?"Overall":ch}</button>;
          })}
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={asvData} margin={{left:10,right:20,top:5,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="m" tick={{fill:"#64748b",fontSize:11,...f}}/>
            <YAxis tick={{fill:"#94a3b8",fontSize:10}}/>
            <Tooltip contentStyle={tt} formatter={v=>`₹${v}`}/>
            {asvChs.map(ch=><Line key={ch} type="monotone" dataKey={ch} stroke={CC[ch]||"#0f172a"} strokeWidth={ch==="All"?2.5:1.5} dot={{r:ch==="All"?3:2}} name={ch==="All"?"Overall":ch}/>)}
            <Legend formatter={v=><span style={{...f,fontSize:10,color:"#64748b"}}>{v}</span>}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── SECTION 3: BENCHMARK TABLE ────────────────────────────────────── */}
      <div style={{...cd,padding:0,overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid #e2e8f0"}}>
          <div style={{...f,fontSize:15,fontWeight:700,color:"#0f172a"}}>Channel Benchmarks — Apr 2026 vs History</div>
          <div style={{...f,fontSize:12,color:"#94a3b8"}}>Non-Tel channels · vs Prev Month, 3M avg, 6M avg</div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",...f,fontSize:12}}>
            <thead><tr style={{borderBottom:"1px solid #e2e8f0",fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em"}}>
              {["Channel","Orders","vs Prev","vs 3M","vs 6M","Amount","ASV","New SIP","Rep SIP"].map(h=>
                <th key={h} style={{padding:"10px 12px",textAlign:h==="Channel"?"left":"right",fontWeight:600}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {benchRows.map((ch,i)=>{
                const d2=chb[ch];if(!d2)return null;const isT=ch==="Total";const clr=CC[ch]||"#94a3b8";
                return(<tr key={ch} style={{borderBottom:"1px solid #f1f5f9",background:isT?"#f0f9ff":i%2===0?"#fff":"#fafbfc",fontWeight:isT?700:400}}>
                  <td style={{padding:"10px 12px",color:isT?"#0f172a":clr,fontWeight:600}}><span style={{display:"inline-flex",alignItems:"center",gap:6}}>{!isT&&<span style={{width:7,height:7,borderRadius:"50%",background:clr,display:"inline-block"}}/>}{isT?"Total Non-Tel":ch}</span></td>
                  <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:"#0f172a",fontSize:14}}>{d2.c.o}</td>
                  <td style={{padding:"10px 12px",textAlign:"right"}}><Dt c={d2.c.o} b={d2.p.o}/></td>
                  <td style={{padding:"10px 12px",textAlign:"right"}}><Dt c={d2.c.o} b={d2.a3.o}/></td>
                  <td style={{padding:"10px 12px",textAlign:"right"}}><Dt c={d2.c.o} b={d2.a6.o}/></td>
                  <td style={{padding:"10px 12px",textAlign:"right",color:"#334155"}}>{fmt(d2.c.a)}</td>
                  <td style={{padding:"10px 12px",textAlign:"right",color:"#059669",fontWeight:500}}>{fmt(d2.c.v)}</td>
                  <td style={{padding:"10px 12px",textAlign:"right",color:"#7c3aed"}}>{d2.c.ns}</td>
                  <td style={{padding:"10px 12px",textAlign:"right",color:"#db2777"}}>{d2.c.rs}</td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2: CHANNEL DEEP DIVE
// ══════════════════════════════════════════════════════════════════════════════
function ChannelTab({onViewSessionJourneys}){
  const[sel,setSel]=useState("DM");
  const[expanded,setExpanded]=useState(null);
  const chd=D.cd[sel]||[];
  const chb=D.chb[sel]||{c:{o:0,a:0,v:0,ns:0,rs:0},p:{},a3:{},a6:{}};
  const clr=CC[sel]||"#94a3b8";

  // Trend sparkline data for channel picker
  const trendFor=(ch)=>{
    return D.cs.map(r=>({m:r.m,v:r[ch]||0}));
  };

  return(
    <div>
      {/* Channel Picker */}
      <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
        {MAIN_CHS.map(ch=>{
          const isSel=sel===ch;const c2=CC[ch];const b=D.chb[ch];
          const prev=b?b.p.o:0;const cur=b?b.c.o:0;const p=pct(cur,prev);
          return(
            <div key={ch} onClick={()=>{setSel(ch);setExpanded(null);}} style={{padding:"12px 14px",borderRadius:10,border:`1.5px solid ${isSel?c2:"#e2e8f0"}`,background:isSel?c2+"10":"#fff",cursor:"pointer",minWidth:120,transition:"all .15s"}}>
              <div style={{...f,fontSize:10,color:c2,fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4,lineHeight:1.3}}>{ch}</div>
              <div style={{...f,fontSize:20,fontWeight:700,color:"#0f172a"}}>{cur}</div>
              <div style={{...f,fontSize:11,color:"#64748b",marginTop:2}}>{fmt(b?b.c.a:0)}</div>
              {p&&<div style={{...f,fontSize:10,color:parseFloat(p)>=0?"#059669":"#ef4444",fontWeight:600,marginTop:4}}>{parseFloat(p)>=0?"▲":"▼"}{Math.abs(p)}% MoM</div>}
              <svg width="80" height="24" style={{marginTop:4}}>
                {(()=>{const vals=trendFor(ch).map(d=>d.v);const mx=Math.max(...vals)||1;return<polyline points={vals.map((v,i)=>`${i*(80/(vals.length-1))},${22-(v/mx)*20}`).join(" ")} fill="none" stroke={c2} strokeWidth={1.5}/>;})()}
              </svg>
            </div>
          );
        })}
      </div>

      {/* Session Journeys CTA — visible when NULL is selected */}
      {sel==="NULL"&&onViewSessionJourneys&&(
        <div style={{...cd,marginBottom:16,background:"#f5f3ff",border:"1.5px solid #ddd6fe",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{...f,fontSize:13,fontWeight:700,color:"#5b21b6",marginBottom:2}}>🔍 NULL Session Deep Dive Available</div>
            <div style={{...f,fontSize:12,color:"#6d28d9"}}>Journey-level analysis of all 750 NULL sessions (Jan–Apr 2026) · Surfaces hidden Telecalling/CRM patterns & cross-sell opportunities</div>
          </div>
          <button onClick={onViewSessionJourneys} style={{...f,padding:"10px 18px",borderRadius:8,border:"1.5px solid #8b5cf6",background:"#8b5cf6",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600,whiteSpace:"nowrap"}}>View Session Journeys →</button>
        </div>
      )}

      {/* KPI cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
        {[{l:"Orders",k:"o",fmt:fN},{l:"Amount",k:"a",fmt:fmt,ac:"#7c3aed"},{l:"ASV",k:"v",fmt:fmt,ac:"#059669"},{l:"New SIP",k:"ns",fmt:fN,ac:"#0ea5e9"}].map((m,i)=>(
          <div key={i} style={{...cd,borderLeft:`3px solid ${m.ac||clr}`}}>
            <div style={{...f,fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".07em",fontWeight:600,marginBottom:4}}>{m.l}</div>
            <div style={{...f,fontSize:22,fontWeight:700,color:m.ac||clr}}>{m.fmt(chb.c[m.k])}</div>
            <div style={{display:"flex",flexDirection:"column",gap:3,marginTop:6}}>
              <Dt c={chb.c[m.k]} b={chb.p[m.k]} label="prev" s={11}/>
              <Dt c={chb.c[m.k]} b={chb.a3[m.k]} label="3M" s={11}/>
              <Dt c={chb.c[m.k]} b={chb.a6[m.k]} label="6M" s={11}/>
            </div>
          </div>
        ))}
      </div>

      {/* Source × Medium Table */}
      {chd.length>0&&(
        <div style={{...cd,padding:0,overflow:"hidden"}}>
          <div style={{padding:"14px 16px",borderBottom:"1px solid #e2e8f0",display:"flex",justifyContent:"space-between"}}>
            <div style={{...f,fontSize:14,fontWeight:600,color:"#0f172a"}}>{sel} — Source × Medium</div>
            <span style={{...f,fontSize:11,color:"#94a3b8"}}>{chd.length} combos</span>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",...f,fontSize:12}}>
            <thead><tr style={{borderBottom:"1px solid #e2e8f0",fontSize:10,color:"#94a3b8",textTransform:"uppercase"}}>
              {["Source","Medium","Orders","Amount","ASV","New","Rep","MoM","3M","6M",""].map(h=>
                <th key={h} style={{padding:"9px 10px",textAlign:h==="Source"||h==="Medium"?"left":"right",fontWeight:600}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {chd.map((r,i)=>{
                const isExp=expanded===i;
                return(<>
                  <tr key={i} onClick={()=>setExpanded(isExp?null:i)} style={{borderBottom:"1px solid #f1f5f9",background:isExp?"#f0f9ff":i%2===0?"#fff":"#fafbfc",cursor:"pointer"}}>
                    <td style={{padding:"10px 10px",fontWeight:500,color:"#1e293b",maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.s}</td>
                    <td style={{padding:"10px 10px",color:"#64748b",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.d}</td>
                    <td style={{padding:"10px 10px",textAlign:"right",fontWeight:700,color:clr}}>{r.c.o}</td>
                    <td style={{padding:"10px 10px",textAlign:"right"}}>{fmt(r.c.a)}</td>
                    <td style={{padding:"10px 10px",textAlign:"right",color:"#059669",fontWeight:500}}>{fmt(r.c.v)}</td>
                    <td style={{padding:"10px 10px",textAlign:"right",color:"#7c3aed"}}>{r.c.ns}</td>
                    <td style={{padding:"10px 10px",textAlign:"right",color:"#db2777"}}>{r.c.rs}</td>
                    <td style={{padding:"10px 10px",textAlign:"right"}}><Dt c={r.c.o} b={r.p.o}/></td>
                    <td style={{padding:"10px 10px",textAlign:"right"}}><Dt c={r.c.o} b={r.a3.o}/></td>
                    <td style={{padding:"10px 10px",textAlign:"right"}}><Dt c={r.c.o} b={r.a6.o}/></td>
                    <td style={{padding:"10px 10px"}}><button style={{...f,fontSize:10,padding:"3px 8px",borderRadius:6,border:"1px solid #0ea5e9",background:"#f0f9ff",color:"#0ea5e9",cursor:"pointer",fontWeight:500,whiteSpace:"nowrap"}}>Sessions →</button></td>
                  </tr>
                  {isExp&&(
                    <tr key={i+"exp"}><td colSpan={11} style={{background:"#f8fafc",padding:"12px 20px",borderBottom:"1px solid #e2e8f0"}}>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
                        {[{l:"Prev Month",d:r.p},{l:"3M Avg",d:r.a3},{l:"6M Avg",d:r.a6}].map((c,j)=>(
                          <div key={j} style={{background:"#fff",borderRadius:8,padding:"10px 12px",border:"1px solid #e2e8f0"}}>
                            <div style={{...f,fontSize:10,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",marginBottom:6}}>{c.l}</div>
                            <div style={{...f,fontSize:12,color:"#334155"}}>Orders: <b>{typeof c.d.o==='number'?c.d.o:0}</b> · Amount: <b>{fmt(c.d.a||0)}</b></div>
                            <div style={{...f,fontSize:12,color:"#334155"}}>ASV: <b>{fmt(c.d.v||0)}</b> · New: <b style={{color:"#7c3aed"}}>{c.d.ns||0}</b> · Rep: <b style={{color:"#db2777"}}>{c.d.rs||0}</b></div>
                          </div>
                        ))}
                        <div style={{background:"#fff",borderRadius:8,padding:"10px 12px",border:"1px solid #e2e8f0",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                          <button style={{...f,fontSize:11,padding:"8px 16px",borderRadius:8,border:"1.5px solid #0ea5e9",background:"#f0f9ff",color:"#0ea5e9",cursor:"pointer",fontWeight:600,width:"100%"}}>View Session Journeys →</button>
                          <div style={{...f,fontSize:10,color:"#94a3b8",textAlign:"center",marginTop:6}}>Session data linked here</div>
                        </div>
                      </div>
                    </td></tr>
                  )}
                </>);
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3: DONOR QUALITY
// ══════════════════════════════════════════════════════════════════════════════

// 3-month new vs repeat data (Feb / Mar / Apr 2026)
const NVR_3M = [{"ch":"DM","Feb 26_n":222,"Feb 26_r":95,"Mar 26_n":213,"Mar 26_r":64,"Apr 26_n":160,"Apr 26_r":70},{"ch":"NULL","Feb 26_n":53,"Feb 26_r":191,"Mar 26_n":47,"Mar 26_r":192,"Apr 26_n":46,"Apr 26_r":170},{"ch":"CRM","Feb 26_n":106,"Feb 26_r":43,"Mar 26_n":135,"Mar 26_r":66,"Apr 26_n":81,"Apr 26_r":53},{"ch":"Platform","Feb 26_n":59,"Feb 26_r":27,"Mar 26_n":74,"Mar 26_r":22,"Apr 26_n":76,"Apr 26_r":26},{"ch":"Share","Feb 26_n":35,"Feb 26_r":2,"Mar 26_n":35,"Mar 26_r":1,"Apr 26_n":61,"Apr 26_r":6},{"ch":"Update","Feb 26_n":6,"Feb 26_r":1,"Mar 26_n":10,"Mar 26_r":3,"Apr 26_n":13,"Apr 26_r":2},{"ch":"Social Media Team","Feb 26_n":0,"Feb 26_r":6,"Mar 26_n":4,"Mar 26_r":0,"Apr 26_n":3,"Apr 26_r":4},{"ch":"SEO","Feb 26_n":1,"Feb 26_r":0,"Mar 26_n":3,"Mar 26_r":0,"Apr 26_n":2,"Apr 26_r":0},{"ch":"Referral","Feb 26_n":0,"Feb 26_r":0,"Mar 26_n":2,"Mar 26_r":0,"Apr 26_n":1,"Apr 26_r":1}];

// Brand New stacked by channel (overall_order = New)
const BN_STACK = [{"m":"Oct 25","DM":6,"NULL":4,"CRM":1,"Platform":24,"Share":0,"Update":0,"Social Media Team":0,"SEO":1,"Referral":0},{"m":"Nov 25","DM":3,"NULL":10,"CRM":2,"Platform":30,"Share":2,"Update":1,"Social Media Team":0,"SEO":0,"Referral":1},{"m":"Dec 25","DM":3,"NULL":13,"CRM":3,"Platform":22,"Share":2,"Update":0,"Social Media Team":2,"SEO":2,"Referral":1},{"m":"Jan 26","DM":17,"NULL":20,"CRM":2,"Platform":22,"Share":1,"Update":1,"Social Media Team":2,"SEO":0,"Referral":2},{"m":"Feb 26","DM":5,"NULL":18,"CRM":6,"Platform":23,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":0},{"m":"Mar 26","DM":2,"NULL":14,"CRM":3,"Platform":35,"Share":1,"Update":0,"Social Media Team":1,"SEO":0,"Referral":2},{"m":"Apr 26","DM":5,"NULL":7,"CRM":2,"Platform":21,"Share":0,"Update":0,"Social Media Team":0,"SEO":0,"Referral":1}];

function DonorTab(){
  const[newSipFilter,setNewSipFilter]=useState(null);
  const[nvrMonthFilter,setNvrMonthFilter]=useState(null);
  const[bnFilter,setBnFilter]=useState(null);

  const stackData=D.dm.map(r=>{
    const row={m:r.m};
    MAIN_CHS.forEach(ch=>{row[ch]=r[ch+'_ns']||0});
    return row;
  });

  // Stacked label component that handles % placement (inside if big, outside if small)
  const stackLabel = (channels, dataArr, filter) => (ch) => (props) => {
    const {x,y,width,height,value,index} = props;
    if (!value || value === 0) return null;
    if (filter) {
      // When filtered, show absolute number not %
      const isSmall = height < 22;
      const txt = fN(value);
      if (isSmall) return <text x={x+width+4} y={y+height/2+3} fontSize={9} fill={CC[ch]} style={f} fontWeight={600}>{txt}</text>;
      return <text x={x+width/2} y={y+height/2+3} textAnchor="middle" fontSize={10} fill="#fff" style={f} fontWeight={600}>{txt}</text>;
    }
    const total = channels.reduce((s,c)=>s+(dataArr[index]?.[c]||0),0);
    const p = total>0 ? (value/total)*100 : 0;
    if (p < 1) return null;
    const isSmall = height < 22;
    const txt = p>=10 ? `${Math.round(p)}%` : `${p.toFixed(1)}%`;
    if (isSmall) {
      return <text x={x+width+4} y={y+height/2+3} fontSize={9} fill={CC[ch]} style={f} fontWeight={600}>{txt}</text>;
    }
    return <text x={x+width/2} y={y+height/2+3} textAnchor="middle" fontSize={10} fill="#fff" style={f} fontWeight={600}>{txt}</text>;
  };

  const newSipLabel = stackLabel(MAIN_CHS, stackData, newSipFilter);
  const bnLabel = stackLabel(MAIN_CHS, BN_STACK, bnFilter);

  // Color map for NVR months
  const NVR_MONTH_COLORS = {"Feb 26":"#7c3aed","Mar 26":"#0ea5e9","Apr 26":"#059669"};
  const NVR_MONTH_LIGHT = {"Feb 26":"#c4b5fd","Mar 26":"#bae6fd","Apr 26":"#a7f3d0"};
  const NVR_MONTHS = ["Feb 26","Mar 26","Apr 26"];

  return(
    <div>
      {/* New SIP donors stacked MoM — taller + % labels */}
      <div style={{...cd,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{...f,fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:2}}>New SIP Donors by Channel — MoM</div>
            <div style={{...f,fontSize:12,color:"#94a3b8"}}>First-ever SIP on Ketto · Stacked by acquisition channel · Click legend to filter</div>
          </div>
          {newSipFilter&&<FilterPill label={newSipFilter} color={CC[newSipFilter]||"#0f172a"} onClear={()=>setNewSipFilter(null)}/>}
        </div>
        <ResponsiveContainer width="100%" height={440}>
          <BarChart data={stackData} margin={{left:10,right:60,top:10,bottom:0}} barSize={56}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="m" tick={{fill:"#64748b",fontSize:12,...f}}/>
            <YAxis tick={{fill:"#94a3b8",fontSize:10}}/>
            <Tooltip contentStyle={tt}/>
            {MAIN_CHS.filter(ch=>!newSipFilter||ch===newSipFilter).map((ch,i,arr)=>(
              <Bar key={ch} dataKey={ch} stackId="a" fill={CC[ch]} radius={i===arr.length-1?[3,3,0,0]:[0,0,0,0]} label={newSipLabel(ch)}/>
            ))}
          </BarChart>
        </ResponsiveContainer>
        <ClickableLegend items={MAIN_CHS} onClick={(ch)=>setNewSipFilter(newSipFilter===ch?null:ch)} selected={newSipFilter} getColor={(ch)=>CC[ch]||"#94a3b8"}/>
      </div>

      {/* New vs Repeat (SIP) — 3-month grouped bars by channel */}
      <div style={{...cd,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{...f,fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:2}}>New vs Repeat (SIP) — 3-Month Trend by Channel</div>
            <div style={{...f,fontSize:12,color:"#94a3b8"}}>Feb, Mar, Apr 2026 · Grouped by month · New (solid) vs Repeat (lighter) · Click legend to filter by month</div>
          </div>
          {nvrMonthFilter&&<FilterPill label={nvrMonthFilter} color={NVR_MONTH_COLORS[nvrMonthFilter]} onClear={()=>setNvrMonthFilter(null)}/>}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={NVR_3M} margin={{left:10,right:10,top:25,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="ch" tick={{fill:"#64748b",fontSize:11,...f}} angle={-15} textAnchor="end" height={50}/>
            <YAxis tick={{fill:"#94a3b8",fontSize:10}}/>
            <Tooltip contentStyle={tt}/>
            {NVR_MONTHS.filter(m=>!nvrMonthFilter||m===nvrMonthFilter).flatMap(m=>[
              <Bar key={m+"_n"} dataKey={m+"_n"} name={m.split(" ")[0]+" New"} fill={NVR_MONTH_COLORS[m]} radius={[2,2,0,0]} label={{position:"top",fontSize:9,fill:NVR_MONTH_COLORS[m],...f}}/>,
              <Bar key={m+"_r"} dataKey={m+"_r"} name={m.split(" ")[0]+" Rep"} fill={NVR_MONTH_LIGHT[m]} radius={[2,2,0,0]}/>
            ])}
          </BarChart>
        </ResponsiveContainer>
        <ClickableLegend items={NVR_MONTHS} onClick={(m)=>setNvrMonthFilter(nvrMonthFilter===m?null:m)} selected={nvrMonthFilter} getColor={(m)=>NVR_MONTH_COLORS[m]}/>
      </div>

      {/* Brand new to Ketto — stacked by channel */}
      <div style={cd}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{...f,fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:2}}>Brand New to Ketto — by Channel</div>
            <div style={{...f,fontSize:12,color:"#94a3b8"}}>Donors whose first-ever Ketto donation is a SIP · Stacked by channel · Click legend to filter</div>
          </div>
          {bnFilter&&<FilterPill label={bnFilter} color={CC[bnFilter]||"#0f172a"} onClear={()=>setBnFilter(null)}/>}
        </div>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={BN_STACK} margin={{left:10,right:60,top:25,bottom:0}} barSize={56}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="m" tick={{fill:"#64748b",fontSize:12,...f}}/>
            <YAxis tick={{fill:"#94a3b8",fontSize:10}}/>
            <Tooltip contentStyle={tt}/>
            {MAIN_CHS.filter(ch=>!bnFilter||ch===bnFilter).map((ch,i,arr)=>(
              <Bar key={ch} dataKey={ch} stackId="a" fill={CC[ch]} radius={i===arr.length-1?[3,3,0,0]:[0,0,0,0]} label={bnLabel(ch)}/>
            ))}
          </BarChart>
        </ResponsiveContainer>
        <ClickableLegend items={MAIN_CHS} onClick={(ch)=>setBnFilter(bnFilter===ch?null:ch)} selected={bnFilter} getColor={(ch)=>CC[ch]||"#94a3b8"}/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4: PAGE TYPE & DEVICE
// ══════════════════════════════════════════════════════════════════════════════

const DEV_KPI = {
  Desktop: {orders:85,amount:39540,asv:465,p_orders:115,p_amount:81650,p_asv:710,a3_orders:115.0,a3_amount:65595,a3_asv:570},
  Mobile:  {orders:650,amount:255869,asv:394,p_orders:719,p_amount:236640,p_asv:329,a3_orders:730.7,a3_amount:248936,a3_asv:341},
  App:     {orders:40,amount:10200,asv:255,p_orders:37,p_amount:9254,p_asv:250,a3_orders:41.0,a3_amount:7302,a3_asv:178},
};

function PageDeviceTab(){
  const[selCh,setSelCh]=useState("All");
  const[pageFilter,setPageFilter]=useState(null);
  const[deviceFilter,setDeviceFilter]=useState(null);
  const pages=["sip_welcome","sip_inactive","sip_payment_standalone","sip_welcome_failed","stories","thank_you","fundraiser","Blank"];
  const pgClr={"sip_payment_standalone":"#059669","sip_inactive":"#0ea5e9","sip_welcome":"#f97316","sip_welcome_failed":"#ef4444","stories":"#7c3aed","thank_you":"#10b981","fundraiser":"#94a3b8","Blank":"#cbd5e1"};

  const dvData=D.dv.map(r=>{
    const pre=selCh==="All"?"":selCh+"_";
    return{m:r.m,Desktop:r[pre+"D"]||0,Mobile:r[pre+"M"]||0,App:r[pre+"A"]||0};
  });
  const devColors={"Desktop":"#7c3aed","Mobile":"#0ea5e9","App":"#059669"};

  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {["All",...MAIN_CHS].map(c=><Pill key={c} label={c} active={selCh===c} onClick={()=>setSelCh(c)} color={CC[c]||"#0f172a"}/>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        {/* Page type MoM */}
        <div style={cd}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{...f,fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:2}}>Page Type — MoM</div>
              <div style={{...f,fontSize:12,color:"#94a3b8"}}>"Blank" = page not captured · Click legend to filter</div>
            </div>
            {pageFilter&&<FilterPill label={pageFilter} color={pgClr[pageFilter]||"#94a3b8"} onClear={()=>setPageFilter(null)}/>}
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={D.pm} margin={{left:10,right:10,top:5,bottom:0}} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="m" tick={{fill:"#64748b",fontSize:10,...f}}/>
              <YAxis tick={{fill:"#94a3b8",fontSize:10}}/>
              <Tooltip contentStyle={tt}/>
              {pages.filter(p=>!pageFilter||p===pageFilter).map((p,i,arr)=><Bar key={p} dataKey={p} stackId="a" fill={pgClr[p]||"#94a3b8"} radius={i===arr.length-1?[3,3,0,0]:[0,0,0,0]} label={pageFilter?{position:"top",fontSize:10,fill:pgClr[p]||"#94a3b8",...f}:false}/>)}
            </BarChart>
          </ResponsiveContainer>
          <ClickableLegend items={pages} onClick={(p)=>setPageFilter(pageFilter===p?null:p)} selected={pageFilter} getColor={(p)=>pgClr[p]||"#94a3b8"}/>
        </div>

        {/* Device MoM */}
        <div style={cd}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{...f,fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:2}}>Device Split — MoM{selCh!=="All"?` · ${selCh}`:""}</div>
              <div style={{...f,fontSize:12,color:"#94a3b8"}}>Select channel above · Click legend to filter device</div>
            </div>
            {deviceFilter&&<FilterPill label={deviceFilter} color={devColors[deviceFilter]} onClear={()=>setDeviceFilter(null)}/>}
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dvData} margin={{left:10,right:10,top:5,bottom:0}} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="m" tick={{fill:"#64748b",fontSize:10,...f}}/>
              <YAxis tick={{fill:"#94a3b8",fontSize:10}}/>
              <Tooltip contentStyle={tt}/>
              {(!deviceFilter||deviceFilter==="Mobile")&&<Bar dataKey="Mobile" stackId="a" fill="#0ea5e9" label={deviceFilter==="Mobile"?{position:"top",fontSize:10,fill:"#0ea5e9",...f}:{position:"inside",fontSize:9,fill:"#fff",...f}}/>}
              {(!deviceFilter||deviceFilter==="Desktop")&&<Bar dataKey="Desktop" stackId="a" fill="#7c3aed" label={deviceFilter==="Desktop"?{position:"top",fontSize:10,fill:"#7c3aed",...f}:{position:"inside",fontSize:9,fill:"#fff",...f}}/>}
              {(!deviceFilter||deviceFilter==="App")&&<Bar dataKey="App" stackId="a" fill="#059669" radius={[3,3,0,0]} label={deviceFilter==="App"?{position:"top",fontSize:10,fill:"#059669",...f}:false}/>}
            </BarChart>
          </ResponsiveContainer>
          <ClickableLegend items={["Desktop","Mobile","App"]} onClick={(d)=>setDeviceFilter(deviceFilter===d?null:d)} selected={deviceFilter} getColor={(d)=>devColors[d]}/>
        </div>
      </div>

      {/* Device % table by channel - current month */}
      <div style={{...cd,padding:0,overflow:"hidden",marginBottom:16}}>
        <div style={{padding:"12px 16px",borderBottom:"1px solid #e2e8f0",...f,fontSize:14,fontWeight:600,color:"#0f172a"}}>Device Mix by Channel — Apr 2026</div>
        <table style={{width:"100%",borderCollapse:"collapse",...f,fontSize:12}}>
          <thead><tr style={{borderBottom:"1px solid #e2e8f0",fontSize:10,color:"#94a3b8",textTransform:"uppercase"}}>
            {["Channel","Desktop","Mobile","App","Total","Desktop %"].map(h=>
              <th key={h} style={{padding:"9px 12px",textAlign:h==="Channel"?"left":"right",fontWeight:600}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {MAIN_CHS.map((ch,i)=>{
              const latest=D.dv[D.dv.length-1];
              const desk=latest[ch+"_D"]||0,mob=latest[ch+"_M"]||0,app=latest[ch+"_A"]||0;
              const tot=desk+mob+app;const dpct=tot>0?Math.round(desk/tot*100):0;
              return(<tr key={ch} style={{borderBottom:"1px solid #f1f5f9",background:i%2===0?"#fff":"#fafbfc"}}>
                <td style={{padding:"10px 12px",color:CC[ch],fontWeight:600}}><span style={{display:"inline-flex",alignItems:"center",gap:6}}><span style={{width:7,height:7,borderRadius:"50%",background:CC[ch],display:"inline-block"}}/>{ch}</span></td>
                <td style={{padding:"10px 12px",textAlign:"right",color:"#7c3aed"}}>{desk}</td>
                <td style={{padding:"10px 12px",textAlign:"right",color:"#0ea5e9"}}>{mob}</td>
                <td style={{padding:"10px 12px",textAlign:"right",color:"#059669"}}>{app}</td>
                <td style={{padding:"10px 12px",textAlign:"right",fontWeight:600}}>{tot}</td>
                <td style={{padding:"10px 12px",textAlign:"right"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:6}}>
                    <div style={{width:50,height:5,background:"#f1f5f9",borderRadius:99,overflow:"hidden"}}><div style={{width:`${dpct}%`,height:"100%",background:"#7c3aed",borderRadius:99}}/></div>
                    <span style={{...f,fontSize:11,fontWeight:600,color:dpct>60?"#7c3aed":"#64748b"}}>{dpct}%</span>
                  </div>
                </td>
              </tr>);
            })}
          </tbody>
        </table>
      </div>

      {/* Device KPI deep dive cards */}
      <div>
        <div style={{...f,fontSize:14,fontWeight:600,color:"#0f172a",marginBottom:8}}>Device Deep Dive — Apr 2026</div>
        <div style={{...f,fontSize:12,color:"#94a3b8",marginBottom:14}}>Orders, donation amount & ASV per device · vs Prev month, 3M avg</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {[
            {label:"Desktop",color:"#7c3aed",icon:"🖥️",data:DEV_KPI.Desktop},
            {label:"Mobile",color:"#0ea5e9",icon:"📱",data:DEV_KPI.Mobile},
            {label:"App",color:"#059669",icon:"📲",data:DEV_KPI.App},
          ].map(d=>(
            <div key={d.label} style={{...cd,borderTop:`3px solid ${d.color}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:18}}>{d.icon}</span>
                  <span style={{...f,fontSize:14,fontWeight:700,color:d.color}}>{d.label}</span>
                </div>
              </div>
              {/* Orders */}
              <div style={{marginBottom:14}}>
                <div style={{...f,fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",fontWeight:600,marginBottom:4}}>Orders</div>
                <div style={{...f,fontSize:22,fontWeight:700,color:"#0f172a",lineHeight:1.1,marginBottom:6}}>{fN(d.data.orders)}</div>
                <div style={{display:"flex",flexDirection:"column",gap:3}}>
                  <Dt c={d.data.orders} b={d.data.p_orders} label="prev month" s={11}/>
                  <Dt c={d.data.orders} b={d.data.a3_orders} label="3M avg" s={11}/>
                </div>
              </div>
              {/* Donation */}
              <div style={{marginBottom:14,paddingTop:12,borderTop:"1px solid #f1f5f9"}}>
                <div style={{...f,fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",fontWeight:600,marginBottom:4}}>Donation Amount</div>
                <div style={{...f,fontSize:20,fontWeight:700,color:d.color,lineHeight:1.1,marginBottom:6}}>{fmt(d.data.amount)}</div>
                <div style={{display:"flex",flexDirection:"column",gap:3}}>
                  <Dt c={d.data.amount} b={d.data.p_amount} label="prev month" s={11}/>
                  <Dt c={d.data.amount} b={d.data.a3_amount} label="3M avg" s={11}/>
                </div>
              </div>
              {/* ASV */}
              <div style={{paddingTop:12,borderTop:"1px solid #f1f5f9"}}>
                <div style={{...f,fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",fontWeight:600,marginBottom:4}}>ASV</div>
                <div style={{...f,fontSize:20,fontWeight:700,color:"#059669",lineHeight:1.1,marginBottom:6}}>{fmt(d.data.asv)}</div>
                <div style={{display:"flex",flexDirection:"column",gap:3}}>
                  <Dt c={d.data.asv} b={d.data.p_asv} label="prev month" s={11}/>
                  <Dt c={d.data.asv} b={d.data.a3_asv} label="3M avg" s={11}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 5: COUNTRY INSIGHTS
// ══════════════════════════════════════════════════════════════════════════════
function CountryTab(){
  const[selCountry,setSelCountry]=useState(null);
  const[selChTrend,setSelChTrend]=useState("All");
  const[trendMk,setTrendMk]=useState("o");
  const trendLabels={"o":"Orders","a":"Amount (₹)","v":"ASV (₹)"};

  const india=D.co.find(c=>c.c==="India");
  const intl=D.co.filter(c=>c.c!=="India");
  const sel=D.co.find(c=>c.c===selCountry);
  const trendData=sel&&sel.tr[selChTrend]?sel.tr[selChTrend]:[];
  const trendChOpts=sel?["All",...Object.keys(sel.tr).filter(k=>k!=="All")]:[];

  return(
    <div>
      {/* India hero */}
      {india&&(
        <div onClick={()=>{setSelCountry(selCountry==="India"?null:"India");setSelChTrend("All");}} style={{...cd,border:"1.5px solid #fed7aa",background:"#fffbf5",marginBottom:14,cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>🇮🇳</span>
              <div><div style={{...f,fontSize:15,fontWeight:700,color:"#0f172a"}}>India</div><div style={{...f,fontSize:11,color:"#94a3b8"}}>Click to expand trend + channels</div></div>
            </div>
            {[["Orders",fN(india.o),"#0f172a"],["Amount",fmt(india.a),"#7c3aed"],["ASV",fmt(india.v),"#059669"],["New SIP",india.ns,"#0ea5e9"],["Repeat",india.rs,"#db2777"]].map(([l,v,c])=>(
              <div key={l} style={{textAlign:"center"}}><div style={{...f,fontSize:10,color:"#94a3b8",textTransform:"uppercase",fontWeight:600,marginBottom:2}}>{l}</div><div style={{...f,fontSize:18,fontWeight:700,color:c}}>{v}</div></div>
            ))}
          </div>
        </div>
      )}

      {/* International table */}
      <div style={{...cd,padding:0,overflow:"hidden",marginBottom:16}}>
        <div style={{padding:"12px 16px",borderBottom:"1px solid #e2e8f0",...f,fontSize:14,fontWeight:600}}>International — {intl.length} countries · ₹ INR converted</div>
        <table style={{width:"100%",borderCollapse:"collapse",...f,fontSize:12}}>
          <thead><tr style={{borderBottom:"1px solid #e2e8f0",fontSize:10,color:"#94a3b8",textTransform:"uppercase"}}>
            {["Country","Orders","Amount","ASV","New SIP","Repeat","Top Channel"].map(h=>
              <th key={h} style={{padding:"9px 12px",textAlign:h==="Country"||h==="Top Channel"?"left":"right",fontWeight:600}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {intl.map((c,i)=>{
              const top=c.chs&&c.chs[0];
              return(<tr key={i} onClick={()=>{setSelCountry(c.c===selCountry?null:c.c);setSelChTrend("All");}} style={{borderBottom:"1px solid #f1f5f9",background:selCountry===c.c?"#f0f9ff":i%2===0?"#fff":"#fafbfc",cursor:"pointer"}}>
                <td style={{padding:"10px 12px",fontWeight:500,color:"#1e293b"}}>{c.c}</td>
                <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:"#0ea5e9"}}>{c.o}</td>
                <td style={{padding:"10px 12px",textAlign:"right"}}>{fmt(c.a)}</td>
                <td style={{padding:"10px 12px",textAlign:"right",color:"#059669",fontWeight:500}}>{fmt(c.v)}</td>
                <td style={{padding:"10px 12px",textAlign:"right",color:"#7c3aed"}}>{c.ns}</td>
                <td style={{padding:"10px 12px",textAlign:"right",color:"#db2777"}}>{c.rs}</td>
                <td style={{padding:"10px 12px"}}>
                  {top&&<span style={{display:"inline-flex",alignItems:"center",gap:4}}><span style={{width:6,height:6,borderRadius:"50%",background:CC[top.ch]||"#94a3b8"}}/><span style={{fontSize:11}}>{top.ch} ({top.o})</span></span>}
                </td>
              </tr>);
            })}
          </tbody>
        </table>
      </div>

      {/* Expanded country detail */}
      {sel&&(
        <div style={cd}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12,flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{...f,fontSize:16,fontWeight:700,color:"#0f172a"}}>{sel.c}</div>
              <div style={{...f,fontSize:12,color:"#94a3b8"}}>7-month trend · Click channel below to filter · {trendLabels[trendMk]}</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              {Object.entries(trendLabels).map(([k,l])=>
                <Pill key={k} label={l} active={trendMk===k} onClick={()=>setTrendMk(k)}/>
              )}
            </div>
          </div>

          {/* Channel breakdown chips */}
          <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}>
            {sel.chs&&sel.chs.map(ch=>(
              <div key={ch.ch} onClick={()=>setSelChTrend(selChTrend===ch.ch?"All":ch.ch)}
                style={{background:selChTrend===ch.ch?(CC[ch.ch]||"#94a3b8")+"14":"#fff",border:`1.5px solid ${selChTrend===ch.ch?(CC[ch.ch]||"#94a3b8"):"#e2e8f0"}`,borderRadius:8,padding:"8px 12px",cursor:"pointer",transition:"all .12s"}}>
                <div style={{...f,fontSize:9,color:CC[ch.ch]||"#94a3b8",fontWeight:700,textTransform:"uppercase"}}>{ch.ch}</div>
                <div style={{...f,fontSize:16,fontWeight:700,color:"#0f172a"}}>{ch.o}</div>
                <div style={{...f,fontSize:10,color:"#64748b"}}>{fmt(ch.a)} · ASV {fmt(ch.v)}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            <Pill label="All Channels" active={selChTrend==="All"} onClick={()=>setSelChTrend("All")} color="#0f172a"/>
          </div>

          {/* Trend chart */}
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trendData} margin={{left:10,right:10,top:25,bottom:0}} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="m" tick={{fill:"#64748b",fontSize:11,...f}}/>
              <YAxis tick={{fill:"#94a3b8",fontSize:10}}/>
              <Tooltip contentStyle={tt} formatter={v=>trendMk==="o"?v:fmt(v)}/>
              <Bar dataKey={trendMk} fill={selChTrend==="All"?"#0f172a":(CC[selChTrend]||"#94a3b8")} radius={[3,3,0,0]}
                label={{position:"top",fontSize:10,fill:selChTrend==="All"?"#0f172a":(CC[selChTrend]||"#94a3b8"),...f,formatter:v=>trendMk==="o"?v:fmt(v)}}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ══════════════════════════════════════════════════════════════════════════════
export default function SipMonthlyReport({onViewSessionJourneys}={}){
  const[tab,setTab]=useState("pulse");
  const tabs=[
    {k:"pulse",l:"SIP Pulse & Benchmarks"},
    {k:"channel",l:"Channel Deep Dive"},
    {k:"donor",l:"Donor Quality"},
    {k:"pagedevice",l:"Page & Device"},
    {k:"country",l:"Country Insights"},
  ];

  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet"/>
      <div style={{minHeight:"100vh",background:"#f8fafc",...f}}>
        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",padding:"16px 28px"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:3,flexWrap:"wrap"}}>
                <span style={{...f,fontSize:17,fontWeight:700,color:"#0f172a"}}>Ketto SIP</span>
                <span style={{...f,fontSize:12,background:"#f1f5f9",color:"#64748b",padding:"2px 10px",borderRadius:20,fontWeight:500}}>Monthly Report</span>
                <span style={{...f,fontSize:12,background:"#fff7ed",color:"#f97316",padding:"2px 10px",borderRadius:20,fontWeight:500,border:"1px solid #fed7aa"}}>Apr 2026</span>
                <span style={{...f,fontSize:12,background:"#f0fdf4",color:"#059669",padding:"2px 10px",borderRadius:20,fontWeight:500,border:"1px solid #bbf7d0"}}>Successful Only</span>
              </div>
              <div style={{...f,fontSize:12,color:"#94a3b8"}}>Oct 2025 – Apr 2026 · Non-Telecalling focus · All amounts ₹ INR</div>
            </div>
            <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:10,padding:"8px 18px",textAlign:"center"}}>
              <div style={{...f,fontSize:10,color:"#f97316",fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Telecalling (Apr 26)</div>
              <div style={{...f,fontSize:22,fontWeight:700,color:"#f97316"}}>3,566</div>
              <div style={{...f,fontSize:10,color:"#94a3b8"}}>orders · view only</div>
            </div>
          </div>
        </div>

        {/* ── CONTENT ─────────────────────────────────────────────────────── */}
        <div style={{padding:"20px 28px",maxWidth:1440,margin:"0 auto"}}>
          <div style={{borderBottom:"1px solid #e2e8f0",marginBottom:22,display:"flex",flexWrap:"wrap"}}>
            {tabs.map(t=><TabBtn key={t.k} label={t.l} active={tab===t.k} onClick={()=>setTab(t.k)}/>)}
          </div>
          {tab==="pulse"&&<PulseTab/>}
          {tab==="channel"&&<ChannelTab onViewSessionJourneys={onViewSessionJourneys}/>}
          {tab==="donor"&&<DonorTab/>}
          {tab==="pagedevice"&&<PageDeviceTab/>}
          {tab==="country"&&<CountryTab/>}
        </div>
      </div>
    </>
  );
}
