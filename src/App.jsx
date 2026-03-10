import { useState, useCallback, useEffect, useRef } from "react";

const outlets = [
  { id: "tl", name: "Tin Lizard", sub: "Bar & Grill", icon: "🦎" },
  { id: "wb", name: "William B's", sub: "Steakhouse", icon: "🥩" },
  { id: "nd", name: "Nelson's Deli", sub: "Quick Service", icon: "🥪" },
  { id: "bb", name: "Bourbon's", sub: "Hotel Lounge", icon: "🥃" },
  { id: "pad", name: "Par-A-Dice", sub: "Casino & Hotel", icon: "🎰" },
];

const categories = [
  { id: 1, name: "Typography & Lettering", range: [1, 50] },
  { id: 2, name: "Reveal & Transition Animations", range: [51, 100] },
  { id: 3, name: "Camera Movements & Angles", range: [101, 150] },
  { id: 4, name: "Lighting Techniques", range: [151, 200] },
  { id: 5, name: "Motion & Time Manipulation", range: [201, 250] },
  { id: 6, name: "Texture & Material Overlays", range: [251, 300] },
  { id: 7, name: "Practical Effects & In-Camera", range: [301, 370] },
  { id: 8, name: "Graphic & Design Treatments", range: [371, 430] },
  { id: 9, name: "Conceptual & Narrative Frameworks", range: [431, 500] },
  { id: 10, name: "Color & Mood Treatments", range: [501, 550] },
  { id: 11, name: "Sound-Visual Synesthesia", range: [551, 600] },
  { id: 12, name: "Food-Specific Cinematography", range: [601, 670] },
  { id: 13, name: "Architectural & Space", range: [671, 730] },
  { id: 14, name: "Human & Lifestyle", range: [731, 800] },
  { id: 15, name: "Digital & AI-Enhanced", range: [801, 850] },
  { id: 16, name: "Analog & Retro Aesthetics", range: [851, 900] },
  { id: 17, name: "Seasonal & Event-Driven", range: [901, 950] },
  { id: 18, name: "Logo & Brand Integration", range: [951, 1000] },
  { id: 19, name: "Aerial & Drone", range: [1001, 1040] },
  { id: 20, name: "360° & Immersive", range: [1041, 1065] },
  { id: 21, name: "Photogrammetry & 3D", range: [1066, 1090] },
  { id: 22, name: "Thermal & Specialty Imaging", range: [1091, 1110] },
  { id: 23, name: "Multi-Camera & Coverage", range: [1111, 1135] },
  { id: 24, name: "Interactive & Social-Native", range: [1136, 1165] },
  { id: 25, name: "BTS & Process Content", range: [1166, 1200] },
  { id: 26, name: "Riverboat & Waterfront", range: [1201, 1230] },
  { id: 27, name: "Gaming Floor & Casino Culture", range: [1231, 1270] },
  { id: 28, name: "Hotel & Guest Experience", range: [1271, 1305] },
  { id: 29, name: "Boyd Rewards & Promotions", range: [1306, 1335] },
  { id: 30, name: "Local & Seasonal Illinois River Valley", range: [1336, 1370] },
];

// Compact data: [id, name, outlets_string] where outlets_string uses t=TL w=WB n=ND b=BB p=PAD
const S = [
[1,"White chalk street lettering on dark pavement","tn"],
[2,"Neon tube script traced over footage","tp"],
[3,"Cursive ink bleed reveal","wb"],
[4,"Condensation finger-writing on cold glass","t"],
[5,"Salt pour lettering on dark bar top","t"],
[6,"Gold leaf press-on lettering","wpb"],
[7,"Typewriter key strike animation","wp"],
[8,"Flour dust lettering on cutting board","tn"],
[9,"Smoke lettering dissipating into air","twp"],
[10,"Grease pencil scrawl on butcher paper","tn"],
[11,"Frost crystal forming into words on glass","wb"],
[12,"Matchstick burn lettering into wood","tw"],
[13,"Ketchup squeeze-bottle script on white plate","tn"],
[14,"Branded iron burn into wood plank","twp"],
[15,"Stencil spray paint on concrete","t"],
[16,"Cocktail napkin ballpoint pen handwriting","t"],
[17,"Embossed leather stamp lettering","wpb"],
[18,"Playing card suit symbols replacing letters","tp"],
[19,"Marquee lightbulb letter reveal","tp"],
[20,"Liquid pour lettering","tw"],
[21,"Knife-carved lettering into cutting board","tw"],
[22,"Breath fog lettering on cold window","tw"],
[23,"Dice arrangement spelling words","p"],
[24,"Poker chip stack typography","p"],
[25,"Receipt printer text scroll","n"],
[26,"Casino scoreboard flip-card lettering","p"],
[27,"Scratched-into-frost lettering on beer mug","t"],
[28,"Menu board chalk lettering","tn"],
[29,"Melting ice text","tw"],
[30,"Neon sign flicker-on text","tp"],
[31,"Newspaper headline cut-and-paste",""],
[32,"Vintage ticket stub lettering","p"],
[33,"Fire lettering","t"],
[34,"Caramel drizzle cursive on dessert plate","w"],
[35,"Embroidered thread lettering on napkin","w"],
[36,"Engraved crystal glass lettering","wp"],
[37,"Vintage postcard hand-stamped lettering","p"],
[38,"Cocktail garnish arranged as letters","tw"],
[39,"Illuminated manuscript drop cap","w"],
[40,"Digital glitch text with scan line artifacts","tp"],
[41,"Blueprint technical drawing lettering","p"],
[42,"Cork board push-pin letter arrangement","tn"],
[43,"Magnetic letter board café style","n"],
[44,"Etched mirror lettering vintage bar mirror","twp"],
[45,"Glow-in-the-dark UV paint lettering","tp"],
[46,"Bead-of-water lettering on polished surface","w"],
[47,"Cracked leather embossed text","wp"],
[48,"Wooden block letter arrangement Scrabble style","t"],
[49,"Laser-etched text on metal surface","wp"],
[50,"Candy letter mold typography","tn"],
[51,"Dice roll reveal","p"],
[52,"Playing card flip transition","p"],
[53,"Slot machine reel spin","p"],
[54,"Smoke clear reveal","twp"],
[55,"Bottle cap pop transition","t"],
[56,"Cocktail shaker shake-and-pour reveal","tw"],
[57,"Door push-open reveal","twp"],
[58,"Curtain pull reveal","wp"],
[59,"Menu flip reveal","twn"],
[60,"Chip toss transition","p"],
[61,"Flame burst transition","t"],
[62,"Ice crack reveal","tw"],
[63,"Napkin unfold reveal","w"],
[64,"Shot glass slam transition","t"],
[65,"Elevator door open reveal","p"],
[66,"Beer tap pull transition","t"],
[67,"Knife slice transition","twn"],
[68,"Roulette wheel spin reveal","p"],
[69,"Tablecloth pull reveal","w"],
[70,"Match strike transition","tw"],
[71,"Polaroid develop reveal","tp"],
[72,"Record needle drop transition","t"],
[73,"Oven door open reveal","twn"],
[74,"Blindfold removal reveal","w"],
[75,"Confetti burst transition","tp"],
[76,"Subway tile wipe",""],
[77,"Water splash transition","t"],
[78,"Lens cap remove reveal","p"],
[79,"Pizza box lid open reveal","t"],
[80,"Wallet open reveal","p"],
[81,"Zippo lighter open-and-light","t"],
[82,"Refrigerator door open reveal","twn"],
[83,"Book page turn transition","wp"],
[84,"Cocktail umbrella spin wipe","t"],
[85,"Domino fall chain reaction reveal","p"],
[86,"Cork pop champagne spray","twp"],
[87,"Salt shaker tilt pour wipe","tn"],
[88,"Window shade roll-up reveal","wp"],
[89,"Casino chip stack collapse","p"],
[90,"Card deal slide transition","p"],
[91,"Spinning tray reveal Lazy Susan","tw"],
[92,"Steam lift reveal","twn"],
[93,"Drumstick hit cymbal crash","t"],
[94,"Check presenter open reveal","w"],
[95,"Wine decanter pour transition","w"],
[96,"Ticket tear transition","p"],
[97,"Light switch flip transition","tp"],
[98,"Morph cut between similar shapes","twnp"],
[99,"Finger snap transition","t"],
[100,"Candle blow-out transition","w"],
[101,"Overhead flat lay 90° top-down","twn"],
[102,"Hero angle 15–25° above","twn"],
[103,"Tabletop-level eye line","twn"],
[104,"Extreme macro texture fill","twp"],
[105,"Dutch angle tilted frame","tp"],
[106,"Worm's eye view floor up","tp"],
[107,"Orbit shot 360° gimbal circle","twp"],
[108,"Push-in dolly","twp"],
[109,"Pull-back reveal dolly","twp"],
[110,"Vertical crane descent","twp"],
[111,"Vertical crane ascent","twp"],
[112,"Lateral slider track","twnp"],
[113,"Through-the-window shot","twp"],
[114,"Peekaboo shot through objects","tw"],
[115,"Follow shot trailing someone","twp"],
[116,"Leading shot ahead of subject","twp"],
[117,"Whip pan","tnp"],
[118,"Snap zoom","tnp"],
[119,"Rack focus pull FG to BG","twp"],
[120,"Rack focus push BG to FG","twp"],
[121,"Split diopter","wp"],
[122,"Tilt-shift miniature","p"],
[123,"Mirror/reflection shot","twp"],
[124,"Silhouette framing","twp"],
[125,"Over-the-shoulder toward guest","twn"],
[126,"POV shot first person guest","twnp"],
[127,"Overhead tracking following a plate","twn"],
[128,"Steadicam walk-and-talk","twp"],
[129,"Low dolly along bar counter","tw"],
[130,"Crane-up from food to dining room","tw"],
[131,"Snorricam mounted to subject","t"],
[132,"Canted push-in","tp"],
[133,"Parallax slide","twp"],
[134,"Static locked-off","twnp"],
[135,"Handheld documentary","tn"],
[136,"Circular dolly arc around table","w"],
[137,"Zoom crawl extremely slow zoom","wp"],
[138,"Jib arm sweep","twp"],
[139,"Doorway dolly through door into space","twnp"],
[140,"Under-glass shot looking up through table","tw"],
[141,"Bartender's POV","tw"],
[142,"Pass-through shot","twnp"],
[143,"Vertigo dolly zoom","wp"],
[144,"Two-shot composition","twp"],
[145,"Deep staging multiple depth planes","twp"],
[146,"Negative space composition","wp"],
[147,"Centered symmetry","wp"],
[148,"Edge-of-frame tension","tw"],
[149,"Foreground bokeh frame","twp"],
[150,"Layered depth rack 3 planes","wp"],
[151,"Single candle illumination","wb"],
[152,"Neon wash colored neon fills scene","tpb"],
[153,"Rim light silhouette","twpb"],
[154,"Chiaroscuro high contrast","wp"],
[155,"Blacklight UV glow","tp"],
[156,"Spotlight isolation","twp"],
[157,"Backlit steam/smoke","twb"],
[158,"Golden hour window light","wnp"],
[159,"Practical lights only venue fixtures","twnp"],
[160,"Edison bulb warm glow","twb"],
[161,"Overhead pendant pool","twn"],
[162,"Under-lit dramatic uplighting","twp"],
[163,"Cross lighting two opposing sources","tw"],
[164,"Butterfly lighting beauty style","w"],
[165,"Rembrandt lighting triangle on cheek","w"],
[166,"Split lighting half lit half shadow","twp"],
[167,"Colored gel wash","tp"],
[168,"Bi-color gel split","tp"],
[169,"Fairy light bokeh background","twp"],
[170,"Strobe flash freeze","t"],
[171,"Gobo pattern lighting","wp"],
[172,"Diffused overcast simulation","n"],
[173,"Hard direct sunlight","np"],
[174,"Dappled light through foliage","wp"],
[175,"Fire light flicker","tw"],
[176,"Refrigerator door light","tn"],
[177,"Bar back-glow backlit bottles","tw"],
[178,"Slot machine glow","p"],
[179,"Stage lighting sweep","tp"],
[180,"Emergency exit sign glow accent","tp"],
[181,"Candlelit reflection on glassware","w"],
[182,"LED strip accent lighting","tp"],
[183,"Tungsten vs daylight contrast","twp"],
[184,"Flash-to-ambient transition","t"],
[185,"Light painting with phone screen","t"],
[186,"Chandelier overhead spread","wp"],
[187,"Table lamp side glow","wp"],
[188,"Projected pattern light","wp"],
[189,"Backlit menu/sign glow","twnp"],
[190,"Neon reflection on wet surface","tp"],
[191,"Headlight sweep cars outside","p"],
[192,"Television screen glow","tp"],
[193,"Lighter flick illumination","t"],
[194,"Pin light tiny focused beam","w"],
[195,"Moonlight simulation","p"],
[196,"Dawn/dusk gradient","p"],
[197,"Mirror ball scatter","tp"],
[198,"Flashlight search beam",""],
[199,"Cooking flame glow gas burner","tw"],
[200,"Window blinds stripe lighting","wp"],
[201,"Stop motion assembly","tn"],
[202,"Reverse video","tn"],
[203,"Slow motion hero pour","tw"],
[204,"Hyperlapse walk-through","tp"],
[205,"Speed ramp slow-to-fast","twp"],
[206,"Infinite zoom","p"],
[207,"Time-lapse prep to plate","twn"],
[208,"Freeze frame with graphics","tnp"],
[209,"Phantom slow-mo 1000fps","w"],
[210,"Strobe staccato","tp"],
[211,"Bullet time frozen orbit","p"],
[212,"Day-to-night time-lapse","p"],
[213,"Cooking process time-lapse","twn"],
[214,"Crowd fill time-lapse","tp"],
[215,"Reverse speed ramp","tw"],
[216,"Frame rate mismatch dreamy stutter","w"],
[217,"Long exposure light trails","p"],
[218,"Interval composite motion path","p"],
[219,"Ping-pong loop forward-reverse","tn"],
[220,"Match-cut time skip","twp"],
[221,"Speed ramped orbit","tw"],
[222,"Rhythmic stop-motion on beat","tn"],
[223,"Claymation-style stop motion",""],
[224,"Paper cutout stop motion",""],
[225,"Puppet/object animation","t"],
[226,"Acceleration zoom","tp"],
[227,"Deceleration reveal","wp"],
[228,"Split-screen time comparison","twnp"],
[229,"Ghost trail effect","tp"],
[230,"Stutter step repeat frames","tn"],
[231,"Rewind scrub","t"],
[232,"Multi-speed montage","twp"],
[233,"Frozen crowd one moving element","twp"],
[234,"Real-time unbroken take","twp"],
[235,"Time-slice photography","p"],
[236,"Ripple time effect",""],
[237,"Step-printed slow motion","w"],
[238,"Snappy keyframe animation","tnp"],
[239,"Slow-mo food toss","tn"],
[240,"Kitchen timer countdown","tn"],
[241,"Cocktail build in reverse slow-mo","tw"],
[242,"Fast-forward service montage","tn"],
[243,"Clock hands spinning overlay","p"],
[244,"Pour-speed comparison","tw"],
[245,"Beat-synced speed changes","tp"],
[246,"Stop-motion flatlay ingredient parade","tn"],
[247,"Growth time-lapse bread rising herbs","tw"],
[248,"Crowd energy pulse speed ramp to bass","tp"],
[249,"Seamless loop","twnp"],
[250,"Dolly time-lapse","p"],
[251,"Felt table green overlay","p"],
[252,"Butcher paper background","tn"],
[253,"Marble countertop texture","wp"],
[254,"Casino carpet pattern overlay","p"],
[255,"Playing card back pattern","p"],
[256,"Linen tablecloth texture","w"],
[257,"Reclaimed wood plank background","tw"],
[258,"Chalkboard surface layer","tn"],
[259,"Hammered copper bar top","tw"],
[260,"Leather booth texture","tw"],
[261,"Stainless steel kitchen surface","twn"],
[262,"Terrazzo floor pattern","p"],
[263,"Red velvet curtain","wp"],
[264,"Exposed brick wall","t"],
[265,"Tile mosaic pattern","wp"],
[266,"Condensation-covered glass","tw"],
[267,"Newspaper print background",""],
[268,"Vintage wallpaper pattern","wp"],
[269,"Kraft paper wrapping","tn"],
[270,"Menu parchment texture","w"],
[271,"Cocktail napkin weave","t"],
[272,"Charred/blackened wood","tw"],
[273,"Polished granite surface","wp"],
[274,"Woven placemat texture","tw"],
[275,"Pressed tin ceiling tile","t"],
[276,"Vinyl record surface grooves","t"],
[277,"Casino chip ribbed edge","p"],
[278,"Cork surface","tw"],
[279,"Frosted glass texture","wp"],
[280,"Brushed metal","wnp"],
[281,"Smoke haze layer","twp"],
[282,"Rain-on-window overlay","wp"],
[283,"Burlap/hessian grain","t"],
[284,"Concrete/cement raw surface","tp"],
[285,"Terrycloth bar towel","t"],
[286,"Honeycomb pattern","w"],
[287,"Basket weave","tn"],
[288,"Sandstone rough surface","p"],
[289,"Worn leather wallet",""],
[290,"Playing card felt poker table close-up","p"],
[291,"Denim weave texture","t"],
[292,"Vintage paper/aged parchment","wp"],
[293,"Water ripple surface","wp"],
[294,"Carbon fiber pattern",""],
[295,"Herringbone wood floor","wp"],
[296,"Ceramic glaze crackle","w"],
[297,"Slate cheese board","tw"],
[298,"Wax seal texture","wp"],
[299,"Glass bottle ribbing","tw"],
[300,"Embossed wallpaper damask","wp"],
[301,"Cheese pull stretch","twn"],
[302,"Sizzle on hot surface","tw"],
[303,"Flame burst flambé","tw"],
[304,"Ice crack into glass","tw"],
[305,"Dice bounce and tumble","p"],
[306,"Card deal slide","p"],
[307,"Cocktail layer pour","tw"],
[308,"Champagne cork pop with spray","twp"],
[309,"Pepper grinder crack","twn"],
[310,"Salt bae sprinkle","t"],
[311,"Smoke gun burst cocktail","tw"],
[312,"Torch brûlée caramelization","w"],
[313,"Bottle spin on bar","t"],
[314,"Beer foam overflow","t"],
[315,"Knife cut through","twn"],
[316,"Citrus zest spray","tw"],
[317,"Garnish drop into cocktail","tw"],
[318,"Powder dusting sugar cocoa flour","tw"],
[319,"Gravy/sauce pour","tw"],
[320,"Skewer slide through","t"],
[321,"Chip shuffle poker chip riffle","p"],
[322,"Napkin flip/snap","w"],
[323,"Whiskey pour over ice","tw"],
[324,"Egg crack and drop","twn"],
[325,"Dough stretch pull","t"],
[326,"Coffee crema swirl","np"],
[327,"Honey drizzle thread","tw"],
[328,"Caramel string pull","tw"],
[329,"Chocolate temper pour","w"],
[330,"Herb chiffonade rapid knife work","tw"],
[331,"Oyster shuck pop","w"],
[332,"Lobster claw crack","w"],
[333,"Wine cork twist-and-pull","w"],
[334,"Pint glass condensation drip","t"],
[335,"Pretzel salt toss","t"],
[336,"Cream whip peak formation","tw"],
[337,"Grinder pepper mill cloud","tw"],
[338,"Bread tear-apart steam release","twn"],
[339,"Cocktail muddling","tw"],
[340,"Ice sculpture chip-away","p"],
[341,"Meat thermometer probe insert","tw"],
[342,"Pasta twirl on fork","tw"],
[343,"Cheese wheel crack-open","w"],
[344,"Pan sauce deglaze","tw"],
[345,"Sushi rice press and shape","w"],
[346,"Cocktail flame float","tw"],
[347,"Crème anglaise river pour","w"],
[348,"Espresso shot pull","np"],
[349,"Whipped butter curl","w"],
[350,"Foam dissipation","t"],
[351,"Sparkler ignition on dessert","tw"],
[352,"Dry ice fog from cocktail","tw"],
[353,"Confetti cannon burst","tp"],
[354,"Balloon pop reveal","tp"],
[355,"Playing cards thrown in air","p"],
[356,"Domino chain topple","p"],
[357,"Pool ball break shot","t"],
[358,"Cinnamon stick snap","tw"],
[359,"Sugar glass shatter",""],
[360,"Flaming shot extinguish","t"],
[361,"Cherry stem tie garnish skill","t"],
[362,"Latte art pour","np"],
[363,"Mussel shell open steam","w"],
[364,"Popcorn kernel pop","t"],
[365,"Table crumb sweep","w"],
[366,"Ring light catch in wine glass","w"],
[367,"Napkin rose fold","w"],
[368,"Straw bubbles in cocktail","t"],
[369,"Ice sphere crack when spirit hits","tw"],
[370,"Truffle shave over dish","w"],
[371,"Duotone color wash","tp"],
[372,"Halftone dot pattern","tp"],
[373,"Line art rotoscope","tp"],
[374,"VHS tracking distortion","t"],
[375,"Scratch-card reveal effect","p"],
[376,"X-ray cutaway inside a dish","twn"],
[377,"Blueprint schematic overlay","wp"],
[378,"Pop art Warhol color blocks","t"],
[379,"Comic book panel layout","tn"],
[380,"Vintage postcard treatment","p"],
[381,"Polaroid frame overlay","tp"],
[382,"Film strip sprocket frame","tp"],
[383,"Split-screen comparison","twnp"],
[384,"Quad-screen grid","tnp"],
[385,"Scrolling ticker tape","p"],
[386,"Sports broadcast overlay","tp"],
[387,"Price tag pop-up","tn"],
[388,"Ingredient list callout","twn"],
[389,"Progress bar overlay cook time","tn"],
[390,"Minimalist geometric frame","wp"],
[391,"Art deco border","wp"],
[392,"Retro diner sign style","tn"],
[393,"Vintage matchbook cover","tp"],
[394,"Tiki bar tropical treatment","t"],
[395,"Speakeasy prohibition-era","tw"],
[396,"Mid-century modern flat design","wp"],
[397,"Memphis design 80s geometric","t"],
[398,"Bauhaus grid composition","wp"],
[399,"Swiss design minimal type grid","wp"],
[400,"Psychedelic swirl color","t"],
[401,"Noir detective film B&W shadows","wp"],
[402,"1920s silent film title card","wp"],
[403,"8-bit pixel art overlay","tp"],
[404,"Glitch art corruption","tp"],
[405,"Scanline CRT monitor","tp"],
[406,"Double exposure blend","twp"],
[407,"Kaleidoscope mirror effect","tp"],
[408,"Prism rainbow light leak","tw"],
[409,"Lens flare punctuation","twp"],
[410,"Film grain overlay","twp"],
[411,"Vignette gradient","twp"],
[412,"Color isolation one color saturated","twp"],
[413,"Infrared false color",""],
[414,"Thermal imaging simulation",""],
[415,"Newspaper classified ad layout",""],
[416,"Instagram-poll-style comparison","twnp"],
[417,"Swipe-to-reveal wipe line","twnp"],
[418,"Floating annotation labels","twnp"],
[419,"Countdown timer overlay","tnp"],
[420,"Location pin drop graphic","twnp"],
[421,"Star rating animation","twnp"],
[422,"QR code integration","twnp"],
[423,"Stamp of approval graphic","twp"],
[424,"Wax seal badge overlay","wp"],
[425,"Ribbon banner graphic","twp"],
[426,"Torn paper edge reveal","tn"],
[427,"Folded paper/origami transition","w"],
[428,"Puzzle piece assembly","p"],
[429,"Scratch mark/tally count","tp"],
[430,"Chalkboard doodle illustration","tn"],
[431,"Ingredient journey farm to plate","tw"],
[432,"Hands-only story no face","twn"],
[433,"ASMR-first edit sound drives visual","twn"],
[434,"Guest POV first person experience","twnp"],
[435,"Empty-to-full transformation","twp"],
[436,"Before/after raw to cooked","twn"],
[437,"Day-in-the-life of a chef","tw"],
[438,"Day-in-the-life of a bartender","twb"],
[439,"Day-in-the-life of a server","twn"],
[440,"One dish three ways","tw"],
[441,"Regular's order","twnb"],
[442,"From scratch narrative","tw"],
[443,"The last bite","twn"],
[444,"The first sip","tw"],
[445,"Secret menu reveal","tw"],
[446,"Staff pick personal favorite","twn"],
[447,"Blind taste test reaction","tn"],
[448,"Kitchen chaos to plated calm","tw"],
[449,"Clock-based narrative 5pm to midnight","twp"],
[450,"Seasonal ingredient spotlight","tw"],
[451,"Head-to-head dish battle","tn"],
[452,"The build-up showing every component","twn"],
[453,"Deconstructed dish explanation","w"],
[454,"One-take service kitchen to table","twn"],
[455,"Nostalgia callback vintage to modern","pb"],
[456,"Guest testimonial candid reactions","twnp"],
[457,"What $X gets you price tier","twn"],
[458,"How it's made process documentary","twn"],
[459,"Bartender's choice","tw"],
[460,"Wine pairing story","w"],
[461,"The transformation ingredient to hero","twn"],
[462,"Community spotlight local supplier","twp"],
[463,"Challenge format chef makes X in Y min","tn"],
[464,"Historical origin story dish's roots","wp"],
[465,"Shift change transition","twnp"],
[466,"Reservation to dessert full arc","w"],
[467,"The handoff kitchen to server to table","twn"],
[468,"I tried everything on the menu","twn"],
[469,"Staff meal reveal","tw"],
[470,"The perfect pour technique doc","tw"],
[471,"Recipe tutorial step-by-step","tw"],
[472,"Myth-busting food misconceptions","tw"],
[473,"Guest surprise/delight moment","twp"],
[474,"What I ordered vs what I got positive","twn"],
[475,"BTS cleaning/prep","twnp"],
[476,"Supplier delivery arrival","tw"],
[477,"Tableside preparation","w"],
[478,"Vintage recipe recreation","wp"],
[479,"Cultural fusion story","tw"],
[480,"If this dish were a person","t"],
[481,"Color story all one color","tw"],
[482,"Texture story all crunch/smooth","tw"],
[483,"Temperature story fire and ice","tw"],
[484,"Sound story kitchen sounds 60 sec","twn"],
[485,"The regulars' table","tw"],
[486,"Closing time ritual","tw"],
[487,"Opening prep ritual","twnp"],
[488,"The accident turned masterpiece","tw"],
[489,"Five senses framework","tw"],
[490,"Letter to the guest text overlay","wp"],
[491,"You've been doing it wrong","tw"],
[492,"Side-by-side prep two chefs same dish","tw"],
[493,"The apprentice learns","twn"],
[494,"What happens after you leave","tw"],
[495,"Lost and found stories","p"],
[496,"The last order of the night","tw"],
[497,"Weather-based narrative","twnp"],
[498,"The one that got away LTO return","tw"],
[499,"Full-circle narrative","twp"],
[500,"Silent film storytelling","wp"],
[501,"Neon noir crushed blacks neon accents","tpb"],
[502,"Warm golden amber","tw"],
[503,"High-key bright and airy","n"],
[504,"Desaturated matte editorial","wp"],
[505,"Teal and orange blockbuster","tp"],
[506,"Monochromatic single-hue wash","wpb"],
[507,"Sepia vintage tone","p"],
[508,"Cross-processed film unexpected shifts","t"],
[509,"Bleach bypass reduced sat high contrast","twp"],
[510,"Day-for-night grade","pb"],
[511,"Kodak Portra emulation","tw"],
[512,"Fuji Velvia emulation punchy saturation","tp"],
[513,"Cinestill 800T tungsten halation","tp"],
[514,"Technicolor two-strip",""],
[515,"Black and white high contrast","twpb"],
[516,"Black and white soft low contrast","wp"],
[517,"Split tone warm highlights cool shadows","twp"],
[518,"Split tone cool highlights warm shadows","wp"],
[519,"Crushed blacks lifted whites faded vintage","tp"],
[520,"S-curve punchy contrast","twnp"],
[521,"Single color pop one saturated rest B&W","twp"],
[522,"Complementary color emphasis","twnp"],
[523,"Analogous harmony grade","wp"],
[524,"Triadic color enhancement","tp"],
[525,"Selective color muting except food","twn"],
[526,"Skin tone protection grade","tw"],
[527,"Deep shadow detail lifted blacks","twp"],
[528,"Blown highlight intentional","w"],
[529,"Red emphasis grade","twp"],
[530,"Green emphasis grade","twn"],
[531,"Blue hour exterior grade","p"],
[532,"Sodium vapor streetlight grade","p"],
[533,"Fluorescent green-cast intentional",""],
[534,"Amber ale grade","t"],
[535,"Rose gold tone","wp"],
[536,"Midnight blue grade","wp"],
[537,"Autumn palette grade","twp"],
[538,"Winter cold grade","p"],
[539,"Spring fresh grade","twnp"],
[540,"Summer heat grade","tnp"],
[541,"Film print fade","p"],
[542,"HDR tone-mapped look",""],
[543,"Lo-fi Instagram vintage","t"],
[544,"High fashion editorial grade","wp"],
[545,"Documentary neutral","twnp"],
[546,"Music video high-saturation pop","tp"],
[547,"Horror-adjacent desaturation",""],
[548,"Wes Anderson pastel palette","p"],
[549,"Michael Mann digital night","p"],
[550,"Wong Kar-wai expired film","t"],
[551,"Beat-synced cuts","tnp"],
[552,"Bass drop slow-mo trigger","tp"],
[553,"Music builds to food reveal","tw"],
[554,"ASMR crunch amplification","twn"],
[555,"ASMR sizzle focus","tw"],
[556,"ASMR pour emphasis","tw"],
[557,"ASMR knife work","twn"],
[558,"ASMR fizz carbonation","twn"],
[559,"Heartbeat rhythm edit","wp"],
[560,"Foley sound design exaggerated","twnp"],
[561,"Silent moment contrast","twp"],
[562,"Vinyl crackle background","tw"],
[563,"Radio tuning dial transition","t"],
[564,"Live band audio transition","tp"],
[565,"Cash register cha-ching","p"],
[566,"Slot machine jingle","p"],
[567,"Kitchen ticket printer sound","twn"],
[568,"Cocktail shaker rhythm as percussion","tw"],
[569,"Wine glass clink punctuation","twp"],
[570,"Ambient crowd murmur bed","twp"],
[571,"Single instrument spotlight","tw"],
[572,"Genre-matched scoring","twnp"],
[573,"Sound effect exaggeration cartoon","tn"],
[574,"Audio ducking for text emphasis","twnp"],
[575,"Reverse audio swell","twpb"],
[576,"Multi-layered sound design","twp"],
[577,"Call-and-response audio edit","tb"],
[578,"Tempo-matched camera movement","twp"],
[579,"Frequency-reactive graphics","tp"],
[580,"Audio-reactive color shift","tp"],
[581,"Binaural audio panning","twp"],
[582,"Voiceover narration overlay","twnp"],
[583,"Whispered narration ASMR","wb"],
[584,"Found sound composition venue sounds only","twnp"],
[585,"Breathing rhythm edit","w"],
[586,"Typewriter sound with text","wp"],
[587,"Vinyl record scratch transition","t"],
[588,"Dramatic pause silence before money shot","twp"],
[589,"Audio-visual acceleration","tnp"],
[590,"Echo/reverb swell","twp"],
[591,"Pitch drop audio lowers as shot slows","tw"],
[592,"Countdown beep sequence","tnp"],
[593,"Glass harmonica elegance tone","w"],
[594,"Cymbal swell for dramatic transitions","twp"],
[595,"Snare hit for hard cuts","tnp"],
[596,"Clinking ice as rhythm track","tw"],
[597,"Ambient nature sounds under food","w"],
[598,"Electronic pulse for nightlife","tp"],
[599,"Acoustic guitar warmth","t"],
[600,"Orchestra swell","wp"],
[601,"Cheese pull extreme close-up","twn"],
[602,"Steam rising off fresh plate","twn"],
[603,"Sauce cascade slow pour","tw"],
[604,"Cross-section cut reveal","twn"],
[605,"Ingredient rain/shower","twn"],
[606,"Tableside plating at camera","w"],
[607,"The perfect stack tower of layers","twn"],
[608,"Fork lift reveal showing layers","twn"],
[609,"Drizzle hero from above","tw"],
[610,"The crunch shot breaking crispy","twn"],
[611,"Melt shot cheese butter chocolate","twn"],
[612,"Bubble close-up champagne frying","tw"],
[613,"The flip pancake patty veg","tw"],
[614,"Plating dot work precise sauce","w"],
[615,"Garnish placement tweezers","w"],
[616,"The reveal lift cloche bowl lid","w"],
[617,"Crumb texture macro","twn"],
[618,"Marbling shot raw steak fat","w"],
[619,"Char pattern close-up grill marks","tw"],
[620,"Emulsification in progress","w"],
[621,"Crystal formation sugar salt macro","w"],
[622,"Frost and condensation on cold drinks","twn"],
[623,"Caramelization close-up","tw"],
[624,"Fermentation bubbles","tw"],
[625,"Julienne/brunoise knife work","w"],
[626,"Mortar and pestle grind","tw"],
[627,"Spice shower dusting grinding","tw"],
[628,"Flambé ignition and die-down","tw"],
[629,"Rolling boil texture","tw"],
[630,"Reduction thickening spoon coat","w"],
[631,"Bread scoring before bake","tw"],
[632,"Tempering chocolate","w"],
[633,"Piping bag precision work","w"],
[634,"Ice cream scoop curl","twn"],
[635,"Coffee bloom pour-over","np"],
[636,"Tea steep color diffusion","wnp"],
[637,"Pickle jar open splash","tn"],
[638,"Can open fizz explosion","tn"],
[639,"Food plating time-lapse","tw"],
[640,"The clean plate empty after great meal","tw"],
[641,"Ingredient spread flat lay","twn"],
[642,"Basket/bowl overflow abundance","t"],
[643,"Single perfect bite composition","twn"],
[644,"Tasting spoon moment chef checks","tw"],
[645,"Pan toss action sauté flip","tw"],
[646,"Wok hei flame burst","t"],
[647,"Dough kneading rhythm","tw"],
[648,"Rolling pin action","tw"],
[649,"Shaking cocktail with visible ice","tw"],
[650,"Muddling herbs","tw"],
[651,"Decanting wine","w"],
[652,"Beer tap pour to perfect head","t"],
[653,"Layer cake slice pull-away","tw"],
[654,"Charcuterie board assembly","tw"],
[655,"Sushi roll cut reveal","w"],
[656,"Ramen egg cut jammy yolk","t"],
[657,"Pizza stretch cheese bridge","t"],
[658,"Burger compression and bite","tn"],
[659,"Taco assembly hand-held","t"],
[660,"Wing sauce toss in bowl","t"],
[661,"Fry basket lift from oil","tn"],
[662,"Soup ladle pour into bowl","twn"],
[663,"Bread basket steam when cloth opened","tw"],
[664,"Olive oil pool on fresh bread","tw"],
[665,"Balsamic reduction drizzle art","w"],
[666,"Wasabi grate on fresh root","w"],
[667,"Truffle shave microplane","w"],
[668,"Lobster tail butter bath","w"],
[669,"Prime rib carving station","tw"],
[670,"Dessert torch brûlée crack","tw"],
[671,"Grand entrance reveal","twp"],
[672,"Neon sign isolation portrait","tp"],
[673,"Bar back beauty shot","tw"],
[674,"Ceiling-to-floor sweep","twp"],
[675,"Booth intimacy framing","tw"],
[676,"Window seat exterior/interior","wp"],
[677,"Staircase perspective","p"],
[678,"Hallway vanishing point","p"],
[679,"Bathroom mirror vanity shot","wp"],
[680,"Kitchen pass window framing","twn"],
[681,"Parking lot to entrance journey","p"],
[682,"Aerial/drone property overview","p"],
[683,"Rooftop perspective","p"],
[684,"Patio/outdoor seating","twp"],
[685,"Felt table landscape gaming floor","p"],
[686,"Slot machine row vanishing point","p"],
[687,"Casino floor symmetry","p"],
[688,"Lobby/check-in first impression","p"],
[689,"Elevator to restaurant floor","p"],
[690,"Host stand welcome perspective","tw"],
[691,"Empty venue beauty before crowds","twnp"],
[692,"Full venue energy packed","twp"],
[693,"Architectural detail macro","twp"],
[694,"Signage collection montage","twnp"],
[695,"Lighting fixture as art","twp"],
[696,"Material texture tour","twp"],
[697,"Reflective surface composition","twp"],
[698,"Color-coordinated venue moments","twp"],
[699,"Geometric pattern repetition","wp"],
[700,"Scale contrast tiny vs massive","twp"],
[701,"Negative space architectural","wp"],
[702,"Cluttered maximalist frame","tp"],
[703,"Through-the-legs shot bar stools","t"],
[704,"Balcony overlook","p"],
[705,"Back-of-house corridor","twnp"],
[706,"Loading dock/delivery area","p"],
[707,"Restroom design detail","wp"],
[708,"Valet/entrance night exterior","p"],
[709,"Seasonal decoration transformation","twnp"],
[710,"Construction/renovation progress","p"],
[711,"Historical comparison vintage vs modern","p"],
[712,"Floor plan overlay on aerial","p"],
[713,"Miniature tilt-shift of venue","p"],
[714,"Vertical panoramic stitch","twp"],
[715,"Focal length comparison","p"],
[716,"Color temperature venue map","p"],
[717,"Sound map visualization","p"],
[718,"Traffic flow visualization","p"],
[719,"Light study through the day","wp"],
[720,"Table setting progression","w"],
[721,"Wine cellar/storage beauty","w"],
[722,"Walk-in cooler fog reveal","twn"],
[723,"Hood vent steam cloud","tw"],
[724,"Dish pit energy","tw"],
[725,"Linen closet organization satisfying","wp"],
[726,"Glassware rack sparkle","tw"],
[727,"Bar tool arrangement","tw"],
[728,"Table number/reservation card","w"],
[729,"Votive candle cluster","w"],
[730,"Coat check/host area personality","wp"],
[731,"Candid laughter capture","twp"],
[732,"Clinking glasses cheers","twp"],
[733,"Server presenting dish with pride","twn"],
[734,"Chef's focused concentration","tw"],
[735,"Bartender flair/bottle flip","t"],
[736,"Guest reaction to first bite","twn"],
[737,"Friend group arrival energy","tp"],
[738,"Date night couple moment","tw"],
[739,"Birthday celebration surprise","twp"],
[740,"Anniversary milestone toast","wp"],
[741,"Live music performer close-up","tp"],
[742,"Drummer energy sticks in motion","t"],
[743,"Guitar player fingers on frets","t"],
[744,"Singer emotion close-up","tp"],
[745,"Crowd singing along","tp"],
[746,"Dance floor energy burst","tp"],
[747,"Karaoke performance","t"],
[748,"Bar conversation intimacy","tw"],
[749,"Solo diner contentment","wn"],
[750,"Staff handshake/high-five","twnp"],
[751,"Kitchen brigade call-and-response","tw"],
[752,"Back-of-house camaraderie","twnp"],
[753,"Host greeting at the door","twp"],
[754,"Sommelier recommendation","w"],
[755,"Tableside service gesture","w"],
[756,"Pour-over bartender precision","tw"],
[757,"Chef tasting for seasoning","tw"],
[758,"Line cook plating speed","twn"],
[759,"Dishwasher rhythm unsung hero","tw"],
[760,"Manager walking the floor","twp"],
[761,"Guest signing the check","w"],
[762,"Cash tip moment","t"],
[763,"Leaving with leftovers","tn"],
[764,"Walk of satisfaction leaving full","twp"],
[765,"Waiting for a table anticipation","tw"],
[766,"Reading the menu deciding","twn"],
[767,"Ordering moment server interaction","twn"],
[768,"Phone-eat guest photographing food","tw"],
[769,"Hands reaching for shared plate","t"],
[770,"Toast moment glasses raised","twp"],
[771,"Napkin-in-lap ritual","w"],
[772,"Wine swirl and sniff","w"],
[773,"First sip of a cocktail","tw"],
[774,"Coffee cup hand-wrap warmth","np"],
[775,"Blowing on hot soup","twn"],
[776,"Bread basket reach","tw"],
[777,"Butter spreading on bread","tw"],
[778,"Squeezing lemon over fish","w"],
[779,"Adding cream to coffee","np"],
[780,"Stirring sugar into tea","wnp"],
[781,"Splitting a dessert","tw"],
[782,"Arm wrestling at the bar","t"],
[783,"Pool game action","t"],
[784,"Darts throw","t"],
[785,"Watching the game on TV","t"],
[786,"High-five after a win","tp"],
[787,"Groan after a loss","tp"],
[788,"Checking the phone",""],
[789,"Taking a selfie at venue","tp"],
[790,"Showing food to Instagram","tw"],
[791,"Staff shift huddle","twnp"],
[792,"Server running food urgency","tw"],
[793,"Bussing a table reset","tw"],
[794,"Polishing silverware","w"],
[795,"Folding napkins","w"],
[796,"Rolling silverware","t"],
[797,"Ice machine scoop","twn"],
[798,"Cutting fruit for garnish","tw"],
[799,"Arranging the bar pre-shift","tw"],
[800,"Turning the sign to OPEN","twnp"],
[801,"Kling AI video render from still","twnp"],
[802,"AI-generated camera movement on static","twnp"],
[803,"AI face/expression enhancement",""],
[804,"AI background replacement",""],
[805,"AI sky replacement for exterior","p"],
[806,"AI upscale phone to cinema","twnp"],
[807,"Neural style transfer painting style","tp"],
[808,"AI parallax from single image 2.5D","twnp"],
[809,"Deepfake lip sync",""],
[810,"AI color match across shoots","twnp"],
[811,"AI object removal cleanup","twnp"],
[812,"AI crowd generation",""],
[813,"AI audio enhancement live music","tp"],
[814,"AI auto-captioning with styled text","twnp"],
[815,"AI-generated treatment variations","twnp"],
[816,"Midjourney concept art for mood boards","twnp"],
[817,"AI-assisted storyboard generation","twnp"],
[818,"AI video interpolation smooth","twnp"],
[819,"Generative fill background extension","twnp"],
[820,"AI image segmentation isolate dish","twnp"],
[821,"Real-time AR filter overlay","tp"],
[822,"AI morphing between dishes","tw"],
[823,"Text-to-video concept visualization","twnp"],
[824,"AI rhythm matching auto-sync to beats","twnp"],
[825,"AI noise reduction low-light","twp"],
[826,"AI super slow-motion interpolation","twp"],
[827,"AI bokeh simulation","twnp"],
[828,"AI relighting change direction post","w"],
[829,"AI subject tracking with dynamic crop","twnp"],
[830,"Generative audio AI soundtrack","twnp"],
[831,"AI meal reconstruction multi-angle stitch","w"],
[832,"Neural radiance field 3D from photos","p"],
[833,"AI food styling enhancement","twn"],
[834,"Automated multi-platform reformatting","twnp"],
[835,"AI thumbnail variants for A/B testing","twnp"],
[836,"Deepdream surreal overlay",""],
[837,"AI weather effects rain snow fog","p"],
[838,"AI time-of-day shift golden hour","wp"],
[839,"Text-to-image logo variations","p"],
[840,"AI stabilization for handheld","twnp"],
[841,"Motion capture to animated characters",""],
[842,"AI ingredient labels that follow items","twn"],
[843,"Volumetric video holographic","p"],
[844,"AI personalization audience versions","twnp"],
[845,"Generative texture creation","twp"],
[846,"AI compositing blend takes","twnp"],
[847,"ML frame selection auto-pick best","twnp"],
[848,"Neural artistic filters","tp"],
[849,"AI music video sync","tp"],
[850,"Automated BTS compilation","twnp"],
[851,"Super 8mm film look","tp"],
[852,"16mm documentary style","twp"],
[853,"35mm cinema emulation","wp"],
[854,"VHS camcorder aesthetic","t"],
[855,"Betamax degraded tape",""],
[856,"Polaroid instant photo","tp"],
[857,"Daguerreotype vintage portrait","p"],
[858,"Cyanotype blue print",""],
[859,"Tin type wet plate",""],
[860,"Disposable camera flash pop","t"],
[861,"Pinhole camera soft vignette","wp"],
[862,"Holga/Lomo light leak and blur","t"],
[863,"Infrared film stock look",""],
[864,"Kodachrome slide film","tp"],
[865,"Ektachrome cool tone","wp"],
[866,"CinemaScope anamorphic flares","twp"],
[867,"Technicolor saturated look","tp"],
[868,"Hand-tinted black and white","wp"],
[869,"Contact sheet layout","twp"],
[870,"Photo booth strip layout","tp"],
[871,"Slide projector click-and-advance","p"],
[872,"Film reel countdown leader","tp"],
[873,"Drive-in movie screen framing","p"],
[874,"Newspaper halftone print","tp"],
[875,"Rotogravure magazine print","wp"],
[876,"Letterpress printed texture","wp"],
[877,"Woodblock print aesthetic",""],
[878,"Lithograph stone print",""],
[879,"Screen print/silk screen","tp"],
[880,"Risograph two-color print","t"],
[881,"Mimeograph purple-ink",""],
[882,"Typewriter struck text","wp"],
[883,"Carbon copy form paper",""],
[884,"Telegram message format","p"],
[885,"Vintage neon sign hum","tp"],
[886,"Jukebox era aesthetic","tp"],
[887,"Art nouveau ornamental border","wp"],
[888,"Art deco geometric gold","wp"],
[889,"Victorian ornate frame","wp"],
[890,"Prohibition speakeasy","twp"],
[891,"1950s diner counter chrome","tn"],
[892,"1960s mod pattern overlay","p"],
[893,"1970s earth tone palette","t"],
[894,"1980s Miami Vice pastel neon","tp"],
[895,"1990s grunge texture overlay","t"],
[896,"Early 2000s digital camera quality","t"],
[897,"Zoetrope animation strip","p"],
[898,"Phenakistoscope spinning disc","p"],
[899,"Thaumatrope flip card","p"],
[900,"Magic lantern projection","wp"],
[901,"New Year's Eve countdown","twp"],
[902,"Valentine's Day romantic plating","tw"],
[903,"St. Patrick's Day green emphasis","tp"],
[904,"Easter spring refresh","wp"],
[905,"Cinco de Mayo fiesta energy","tp"],
[906,"Mother's Day elegant brunch","wp"],
[907,"Father's Day steakhouse classic","twp"],
[908,"Fourth of July red-white-blue","tnp"],
[909,"Summer BBQ outdoor grill","tp"],
[910,"Labor Day end-of-summer nostalgia","tp"],
[911,"Halloween spooky lighting","tp"],
[912,"Thanksgiving harvest abundance","twp"],
[913,"Christmas/holiday warm glow","twnp"],
[914,"New Year's Day brunch recovery","twn"],
[915,"Super Bowl watch party","tnp"],
[916,"March Madness bracket layout","tp"],
[917,"Kentucky Derby mint julep","w"],
[918,"Mardi Gras purple-gold-green","tp"],
[919,"Friday night out energy","twp"],
[920,"Saturday date night mood","twp"],
[921,"Sunday brunch lazy morning","twn"],
[922,"Monday night football bar energy","tp"],
[923,"Taco Tuesday promotion style","t"],
[924,"Wing Wednesday casual","t"],
[925,"Thirsty Thursday drink special","t"],
[926,"Happy hour golden transition","twp"],
[927,"Late night menu after-dark","tnp"],
[928,"Poker tournament event branding","p"],
[929,"Live music night promo","tp"],
[930,"Karaoke night fun","t"],
[931,"Trivia night competitive","t"],
[932,"Wine dinner event elegance","wp"],
[933,"Beer tasting flight layout","t"],
[934,"Whiskey dinner pairing","tw"],
[935,"Chef's table exclusive","w"],
[936,"Private dining event intimacy","wp"],
[937,"Loyalty program celebration","p"],
[938,"Grand opening/renovation reveal","twnp"],
[939,"Anniversary celebration venue","twp"],
[940,"Charity event/community night","twp"],
[941,"Employee appreciation highlight","twnp"],
[942,"Local sports team partnership","tp"],
[943,"Festival/concert cross-promotion","tp"],
[944,"Seasonal menu launch","twn"],
[945,"Limited-time-offer urgency","twnp"],
[946,"Flash sale countdown treatment","tnp"],
[947,"Gift card promotional style","wp"],
[948,"Catering showcase spread","twp"],
[949,"Wedding reception venue","wp"],
[950,"Corporate event capability","wp"],
[951,"Logo watermark subtle corner","twnp"],
[952,"Logo reveal smoke clear","twp"],
[953,"Logo stamp on packaging close-up","twnp"],
[954,"Logo embossed in food","tw"],
[955,"Logo reflected in liquid surface","twp"],
[956,"Logo projected onto wall/table","twp"],
[957,"Logo in neon sign form","tp"],
[958,"Logo as ice cube mold","twp"],
[959,"Logo napkin print close-up","twnp"],
[960,"Logo on staff uniform","twnp"],
[961,"Logo carved into garnish","tw"],
[962,"Logo dusted in powder stencil","tw"],
[963,"Logo formed by ingredient arrangement","twnp"],
[964,"Logo in latte art foam","np"],
[965,"Logo coaster close-up","twp"],
[966,"Logo matchbook/lighter detail","tp"],
[967,"Logo menu cover close-up","twn"],
[968,"Logo building exterior night shot","twp"],
[969,"Logo on glassware","twp"],
[970,"Logo burned into cutting board","tw"],
[971,"Logo woven into placemat/napkin","wp"],
[972,"Logo stitched on chef's coat","twn"],
[973,"Logo on receipt/bill presenter","twn"],
[974,"Logo formed by overhead food arrangement","twn"],
[975,"Logo motion graphic intro bumper","twnp"],
[976,"Logo animated loading screen","p"],
[977,"Logo kinetic typography","twnp"],
[978,"Logo parallax float over b-roll","twnp"],
[979,"Logo glitch-in effect","tp"],
[980,"Logo hand-drawn sketch-to-final","twp"],
[981,"Logo paint stroke reveal","twp"],
[982,"Logo 3D rotation","p"],
[983,"Logo shatter-and-reform","tp"],
[984,"Logo light-write long exposure","tp"],
[985,"Logo particle formation","p"],
[986,"Logo liquid pour formation","twp"],
[987,"Logo fire trace","tp"],
[988,"Logo frost/ice formation","wp"],
[989,"Logo dice arrangement","p"],
[990,"Logo playing card fan reveal","p"],
[991,"Logo poker chip spin-and-land","p"],
[992,"Logo slot reel landing","p"],
[993,"Logo venue mapping projected on building","p"],
[994,"Logo found-in-wild","tp"],
[995,"Logo split across cuts","twp"],
[996,"Logo shadow cast","wp"],
[997,"Logo underwater distortion","w"],
[998,"Logo vinyl sticker peel-and-place","tnp"],
[999,"Logo chalk drawing time-lapse","tp"],
[1000,"Logo firework burst","tp"],
// === AERIAL & DRONE (1001-1040) ===
[1001,"Reveal flight ascending from subject to property wide","twp"],
[1002,"Orbit drone circle around building exterior","p"],
[1003,"Top-down overhead drone food flat lay on patio","tw"],
[1004,"Fly-through entrance doorway into venue","twp"],
[1005,"Parallax altitude shift low-to-high reveal","tp"],
[1006,"Cable cam style linear tracking across dining room","tw"],
[1007,"Dronie pullback from subject selfie-style","tn"],
[1008,"Rooftop descent to street level entrance","p"],
[1009,"Parking lot to entrance approach flight","p"],
[1010,"River-to-property establishing shot","p"],
[1011,"Golden hour exterior orbit with lens flare","p"],
[1012,"Night flight neon exterior glow","tp"],
[1013,"Interior drone low-altitude table skim","tw"],
[1014,"Crowd fly-over during live music event","tp"],
[1015,"Kitchen pass-through aerial thread-the-needle","tw"],
[1016,"Mini drone intimate indoor orbit around dish","tw"],
[1017,"Matrice high-altitude property establishing shot","p"],
[1018,"Follow-drone tracking guest walking to entrance","p"],
[1019,"Vertical ascent from plate on patio to skyline","twp"],
[1020,"Drone hyperlapse sunset to neon transition","p"],
[1021,"Waypoint programmed cinematic flight path","p"],
[1022,"Mavic 4 Pro 100MP aerial still capture","p"],
[1023,"Point of interest orbit around marquee sign","p"],
[1024,"Boomerang drone quick orbit snap-back","tp"],
[1025,"Split-level drone interior-exterior transition","twp"],
[1026,"Tracking shot following server through patio","tw"],
[1027,"Overhead drone mapping shot of full property","p"],
[1028,"Low-altitude buzz past outdoor signage","tp"],
[1029,"Spiral ascent from cocktail on rooftop","twp"],
[1030,"Drone dolly zoom altitude change with zoom","p"],
[1031,"FPV-style fast immersive venue fly-through","tp"],
[1032,"Slow cinematic approach to lit entrance at dusk","p"],
[1033,"Aerial time-lapse parking lot filling up","p"],
[1034,"Drone rack focus foreground tree to building","p"],
[1035,"Reveal flight over river to property at golden hour","p"],
[1036,"Vertical bird's eye descent through open ceiling","twp"],
[1037,"Aerial panoramic stitch multiple angles composited","p"],
[1038,"Chase-cam following a car into the valet","p"],
[1039,"Drone static hover establishing shot night","p"],
[1040,"Low orbit around patio fire pit","twp"],
// === 360° & IMMERSIVE (1041-1065) ===
[1041,"360° full venue walkthrough virtual tour","twnp"],
[1042,"360° tiny planet effect of venue exterior","p"],
[1043,"360° time-lapse venue filling up","tp"],
[1044,"360° bar seat POV full surround","t"],
[1045,"360° kitchen chaos immersive BTS","tw"],
[1046,"360° dining room ambiance capture","tw"],
[1047,"360° stage view from performer perspective","t"],
[1048,"360° reframed vertical crop with motion track","twnp"],
[1049,"360° overcapture slow pan reveal","twp"],
[1050,"360° casino floor immersive sweep","p"],
[1051,"360° booth POV intimate dinner perspective","tw"],
[1052,"360° entrance-to-seat guest journey","twp"],
[1053,"360° ceiling look-up chandelier/fixture reveal","wp"],
[1054,"360° parking-to-table complete guest experience","p"],
[1055,"VR-ready stereoscopic venue capture","p"],
[1056,"360° event night full atmosphere capture","tp"],
[1057,"360° chef's perspective behind the line","tw"],
[1058,"360° slow rotation on tripod ambient loop","twp"],
[1059,"360° bullet time freeze orbiting guest table","wp"],
[1060,"Interactive 360° embedded in social story","tp"],
[1061,"360° rooftop/exterior panoramic night","p"],
[1062,"360° split screen top-bottom dual perspective","twp"],
[1063,"360° zoom-to-flat reframe punch-in","twnp"],
[1064,"360° transition between venues walking path","p"],
[1065,"Spatial audio 360° with directional sound","twp"],
// === PHOTOGRAMMETRY & 3D (1066-1090) ===
[1066,"Point cloud render of venue interior","twp"],
[1067,"3D scan fly-through of dining room","twp"],
[1068,"Digital twin walkthrough of full property","p"],
[1069,"Before-after 3D scan renovation comparison","p"],
[1070,"Photogrammetry dish model 3D rotation","tw"],
[1071,"3D model of signature cocktail rotating","tw"],
[1072,"Wireframe-to-textured render transition","p"],
[1073,"LiDAR depth map visualization of venue","p"],
[1074,"3D floor plan animated walkthrough","p"],
[1075,"Photogrammetry exterior model aerial composite","p"],
[1076,"3D printed miniature of venue photograph","p"],
[1077,"Point cloud particle explosion transition","tp"],
[1078,"3D scan of bar back bottle display","tw"],
[1079,"Digital twin comparison day vs night","p"],
[1080,"Photogrammetry food model turntable spin","tw"],
[1081,"3D venue model with camera path visualization","p"],
[1082,"Gaussian splat render of venue interior","twp"],
[1083,"3D depth effect parallax from scan data","twp"],
[1084,"Cross-section 3D slice through building","p"],
[1085,"Photogrammetry heritage documentation old vs new","p"],
[1086,"3D animated logo floating in scanned venue","twp"],
[1087,"Point cloud colorized artistic render","p"],
[1088,"3D scan detail macro texture enhancement","wp"],
[1089,"RTK precision mapping overhead ortho view","p"],
[1090,"Photogrammetry timelapse of space transformation","p"],
// === THERMAL & SPECIALTY IMAGING (1091-1110) ===
[1091,"Thermal reveal of hot plate arriving at table","tw"],
[1092,"Thermal vision of busy kitchen heat map","tw"],
[1093,"Thermal to visible light transition on steak","tw"],
[1094,"Thermal cocktail pour showing ice vs liquid","tw"],
[1095,"Thermal full venue occupancy heat visualization","p"],
[1096,"Thermal grill surface showing cook zones","t"],
[1097,"Thermal handprint on cold glass reveal","tw"],
[1098,"Thermal overhead dining room people density","p"],
[1099,"UV fluorescent clean-check verification shot","wp"],
[1100,"Infrared exterior architecture at night","p"],
[1101,"Thermal coffee/soup steam visualization","twn"],
[1102,"Thermal side-by-side raw vs cooked comparison","tw"],
[1103,"Thermal time-lapse plate cooling","tw"],
[1104,"Thermal bartender hands working in cold","t"],
[1105,"Thermal oven door open heat blast","tw"],
[1106,"Night vision security-cam aesthetic of venue","p"],
[1107,"Thermal aerial property heat signature map","p"],
[1108,"Spectral analysis color-shift food freshness","w"],
[1109,"Thermal split screen hot kitchen cold dining","tw"],
[1110,"Thermal cocktail ice sphere melting real-time","tw"],
// === MULTI-CAMERA & COVERAGE (1111-1135) ===
[1111,"Dual-cam synced wide and tight simultaneously","twp"],
[1112,"Picture-in-picture kitchen cam over dining shot","tw"],
[1113,"Triple-screen triptych three angles same moment","twp"],
[1114,"Multicam live music full coverage wide mid close","tp"],
[1115,"Synced timecode two-angle food plating","tw"],
[1116,"Split-screen simultaneous kitchen and dining","tw"],
[1117,"Reaction cam guest face during reveal","twp"],
[1118,"GoPro locked-off plus gimbal roaming combo","tp"],
[1119,"Overhead plus eye-level synced dual perspective","tw"],
[1120,"Multi-angle cocktail build three cameras","tw"],
[1121,"Security cam grid multi-venue simultaneous","p"],
[1122,"Drone plus ground cam matched movement","twp"],
[1123,"Multi-cam interview chef or bartender profile","tw"],
[1124,"Picture-in-picture live reaction to food arrival","tw"],
[1125,"Before-during-after triple frame same angle","twn"],
[1126,"Synchronized slow-mo two angles of same pour","tw"],
[1127,"Front-of-house back-of-house simultaneous split","twp"],
[1128,"A-cam B-cam classic two-camera dialogue setup","tw"],
[1129,"Multicam event coverage rapid-switch edit","tp"],
[1130,"Phone plus cinema cam quality contrast","twp"],
[1131,"Time-synced morning prep across all three outlets","p"],
[1132,"Multi-angle single dish hero five cameras","tw"],
[1133,"Crowd cam plus stage cam synced live music","t"],
[1134,"Hidden cam plus hero cam candid-to-styled","tw"],
[1135,"Multi-cam single take different framings composited","twp"],
// === INTERACTIVE & SOCIAL-NATIVE (1136-1165) ===
[1136,"Instagram poll A or B dish comparison","twn"],
[1137,"Swipe left-right before-after comparison","twn"],
[1138,"This or That story format drink choice","twn"],
[1139,"Rate this dish 1-10 engagement prompt","twn"],
[1140,"Duet-style side-by-side chef recreation","tw"],
[1141,"TikTok stitch reaction to food reveal","tw"],
[1142,"Caption this challenge user-generated prompt","twnp"],
[1143,"Tag a friend who needs this prompt","twnp"],
[1144,"Guess the ingredient interactive quiz","tw"],
[1145,"Photo dump carousel multi-image story","twnp"],
[1146,"Save for later bookmark-bait format","twn"],
[1147,"POV ASMR first-person dining experience","twn"],
[1148,"Green screen background swap venue trick","tp"],
[1149,"Trending audio lip-sync with food timing","tn"],
[1150,"Reply to this comment response format","twnp"],
[1151,"Day in my life at the venue series","twp"],
[1152,"What I eat in a day at Par-A-Dice","twnp"],
[1153,"Five things you didn't know about this dish","twn"],
[1154,"Show me your order challenge","twnp"],
[1155,"POV walking in for the first time","twnp"],
[1156,"Wait for it delayed payoff reveal","twn"],
[1157,"Expectation vs reality positive surprise","twn"],
[1158,"Unpopular opinion food debate starter","tw"],
[1159,"Tier list ranking menu items","tw"],
[1160,"Mini vlog casual story-style tour","twp"],
[1161,"Text-on-screen confession format","twnp"],
[1162,"Faceless creator hands-only food content","twn"],
[1163,"Get ready with me going-out prep","tp"],
[1164,"Quiet luxury aesthetic compilation","wp"],
[1165,"Algorithm bait oddly satisfying food loop","twn"],
// === BTS & PROCESS CONTENT (1166-1200) ===
[1166,"Camera gear laid out pre-shoot flat lay","twnp"],
[1167,"Setting up the shot behind-the-scenes","twnp"],
[1168,"Raw to final side-by-side edit comparison","twnp"],
[1169,"Color grading process screen recording","twp"],
[1170,"Location scouting walkthrough pre-production","twnp"],
[1171,"Moodboard to final shot comparison","twp"],
[1172,"Client brief to finished product journey","p"],
[1173,"Lighting setup reveal what it takes","twp"],
[1174,"The photo vs the setup wide shot","twnp"],
[1175,"Sound recording BTS capturing ASMR","tw"],
[1176,"Chef prep hours before service BTS","tw"],
[1177,"Bar setup opening ritual documentation","tw"],
[1178,"Ingredient delivery unboxing arrival","tw"],
[1179,"Recipe development test kitchen BTS","tw"],
[1180,"Staff training moment captured","twnp"],
[1181,"Equipment malfunction recovery story","twnp"],
[1182,"The bloopers and outtakes reel","twnp"],
[1183,"Time-lapse of entire photo shoot compressed","twnp"],
[1184,"Drone setup and launch process","p"],
[1185,"Before and after editing transformation","twnp"],
[1186,"Director's commentary voiceover on footage","twp"],
[1187,"Storyboard to final shot match comparison","twp"],
[1188,"One shot fifty edits style variations","twnp"],
[1189,"How we made this mini documentary","twp"],
[1190,"Production day recap 60 second summary","twnp"],
[1191,"Gear review in context of venue shoot","twnp"],
[1192,"iPhone vs cinema camera comparison at venue","twnp"],
[1193,"Audio mix breakdown layers of the edit","twp"],
[1194,"Night vs day same angle comparison","twp"],
[1195,"Speed vs quality content creation debate","twnp"],
[1196,"The creative process from idea to post","twp"],
[1197,"Thumbnail selection process and A/B test","twnp"],
[1198,"Content calendar planning session BTS","p"],
[1199,"Editing workflow screen capture sped up","twnp"],
[1200,"Wrap day celebration and team shot","twnp"],
// === RIVERBOAT & WATERFRONT (1201-1230) ===
[1201,"Dockside riverboat exterior golden hour wide","p"],
[1202,"Illinois River reflection of casino lights at night","p"],
[1203,"Riverboat hull and waterline close-up texture","p"],
[1204,"Walk-the-gangway entrance transition shot","p"],
[1205,"Four-deck vertical tilt from waterline to top","p"],
[1206,"River fog rolling past docked riverboat at dawn","p"],
[1207,"Shuttle van approach from hotel to casino entrance","p"],
[1208,"Peoria skyline seen across river from property","p"],
[1209,"Sunset behind riverboat silhouette time-lapse","p"],
[1210,"Drone orbit around docked riverboat","p"],
[1211,"Casino entrance neon reflecting on wet dock planks","p"],
[1212,"Illinois River current flowing past hull slow-mo","p"],
[1213,"Guest stepping off gangway onto casino floor","p"],
[1214,"Riverboat lit up at night wide establishing shot","p"],
[1215,"Morning mist on river with property in background","p"],
[1216,"21 Blackjack Blvd street sign with property behind","p"],
[1217,"Aerial reveal ascending from river to full property","p"],
[1218,"Autumn foliage framing riverboat from shore","p"],
[1219,"Winter snow on dock with warm casino glow inside","p"],
[1220,"Spring blooms along walkway to casino entrance","p"],
[1221,"Rain on entrance canopy with guests arriving","p"],
[1222,"Riverboat deck railing detail with river behind","p"],
[1223,"Night exterior marquee sign illumination","p"],
[1224,"Valet area car arrival with property backdrop","p"],
[1225,"Parking lot filling up time-lapse evening rush","p"],
[1226,"Drone fly-through from river over boat to hotel","p"],
[1227,"Historic paddle-wheeler reference vintage overlay","p"],
[1228,"East Peoria riverfront park adjacent establishing","p"],
[1229,"Route 116 approach drive to property POV","p"],
[1230,"Boat and hotel together wide shot showing scale","p"],
// === GAMING FLOOR & CASINO CULTURE (1231-1270) ===
[1231,"Slot machine screen cascade rainbow light burst","p"],
[1232,"Chip stack close-up on green felt under warm light","p"],
[1233,"Roulette wheel spin slow-motion ball bounce","p"],
[1234,"Blackjack card flip dealer hands-only close-up","p"],
[1235,"Jackpot celebration moment confetti and lights","p"],
[1236,"High-limit area moody atmospheric wide shot","p"],
[1237,"FanDuel Sportsbook wall of screens game day","p"],
[1238,"Betting kiosk touch-screen interaction close-up","p"],
[1239,"Green felt texture macro with chip edge detail","p"],
[1240,"Casino floor ambient sound-reactive light painting","p"],
[1241,"First-person POV walk through slot machine rows","p"],
[1242,"Overhead bird's-eye of table game layout","p"],
[1243,"Dice bounce on craps table slow-motion","p"],
[1244,"Card shuffle ASMR hands-only sequence","p"],
[1245,"Slot machine lever pull to spin sequence","p"],
[1246,"Casino floor from entrance wide establishing","p"],
[1247,"Three-card poker hand reveal close-up","p"],
[1248,"Mississippi stud progressive bet moment","p"],
[1249,"Baccarat card squeeze close-up tension","p"],
[1250,"Winner reaction genuine guest celebration","p"],
[1251,"Cocktail server navigating gaming floor tracking","p"],
[1252,"Slot machine button panel macro neon detail","p"],
[1253,"Casino carpet pattern repeating dolly shot","p"],
[1254,"Overhead slot bank geometry rows of light","p"],
[1255,"Dealer chip trick flourish hands-only","p"],
[1256,"Gaming floor transition dusk-to-night energy shift","p"],
[1257,"Sportsbook big screen touchdown moment crowd react","p"],
[1258,"Cash-out ticket printing close-up satisfaction","p"],
[1259,"New slot machine game launch featured hero shot","p"],
[1260,"Casino floor at capacity Friday night wide energy","p"],
[1261,"Morning opening empty floor calm before storm","p"],
[1262,"Security camera aesthetic overhead surveillance","p"],
[1263,"Coin and token texture close-up nostalgic detail","p"],
[1264,"Progressive jackpot counter ticking up close-up","p"],
[1265,"VIP host greeting guest at table personalized","p"],
[1266,"Gaming floor reflected in polished surface","p"],
[1267,"Card table minimum bet sign detail shot","p"],
[1268,"Slot machine bonus round animation screen capture","p"],
[1269,"Casino floor ambient glow through doorway reveal","p"],
[1270,"26000 square feet of floor overhead drone sweep","p"],
// === HOTEL & GUEST EXPERIENCE (1271-1305) ===
[1271,"Art deco lobby interior wide establishing shot","bp"],
[1272,"Room door opening reveal transition","bp"],
[1273,"River view from hotel window time-lapse dawn","bp"],
[1274,"Hotel lobby chandelier look-up detail","bp"],
[1275,"Elevator door reflection lobby light","bp"],
[1276,"Check-in counter interaction warm welcome","bp"],
[1277,"Hallway perspective dolly vanishing point","bp"],
[1278,"Morning coffee with Peoria skyline view","bp"],
[1279,"Hotel-to-casino shuttle ride transition","p"],
[1280,"Turndown service detail chocolate on pillow","bp"],
[1281,"Suite panoramic slow reveal window-to-room","bp"],
[1282,"Art deco wallpaper pattern macro texture","bp"],
[1283,"King bed crisp white linens texture close-up","bp"],
[1284,"Mini-fridge open glow late night snack moment","bp"],
[1285,"Hotel room safe detail security and luxury","bp"],
[1286,"202 rooms exterior windows grid at night","p"],
[1287,"Bathroom vanity mirror reflection portrait","bp"],
[1288,"Room service tray arriving at door","bp"],
[1289,"Ice machine hallway ambient late-night moment","bp"],
[1290,"Hotel robe detail hanging on door hook","bp"],
[1291,"Gym fitness center morning workout establishing","bp"],
[1292,"Conference room meeting setup business amenity","bp"],
[1293,"Ballroom event space empty to full transition","bp"],
[1294,"Gift shop display curated detail shot","p"],
[1295,"Guest walking corridor silhouette backlit","bp"],
[1296,"Hotel exterior at dusk warm windows glowing","bp"],
[1297,"Luggage cart in lobby travel arrival moment","bp"],
[1298,"Wedding venue setup ballroom romantic detail","bp"],
[1299,"Hotel bar Bourbon's entrance warm glow reveal","bp"],
[1300,"Express checkout departure smooth experience","bp"],
[1301,"Complimentary WiFi laptop workspace detail","bp"],
[1302,"Hotel pool area if visible relaxation moment","bp"],
[1303,"Art deco mirror ornamental detail macro","bp"],
[1304,"24-hour front desk night shift warm service","bp"],
[1305,"Guest room window with river barge passing","bp"],
// === BOYD REWARDS & PROMOTIONS (1306-1335) ===
[1306,"Boyd Rewards card scan and screen glow","p"],
[1307,"Tier upgrade celebration Ruby to Sapphire","p"],
[1308,"Rewards kiosk interaction touch-and-check","p"],
[1309,"Comp redemption satisfaction at register","p"],
[1310,"Member-exclusive entry VIP treatment","p"],
[1311,"Points counter incrementing animation overlay","p"],
[1312,"Ruby tier card close-up entry level warmth","p"],
[1313,"Sapphire tier card blue prestige detail","p"],
[1314,"Emerald tier card green exclusivity shot","p"],
[1315,"Onyx tier card dark luxury macro","p"],
[1316,"Titanium tier card peak reward hero shot","p"],
[1317,"Promotional offer text treatment animated","p"],
[1318,"Giveaway countdown energy crowd anticipation","p"],
[1319,"VIP host personal attention special moment","p"],
[1320,"Dining voucher comp handover satisfaction","twbp"],
[1321,"Priority reservation confirmation WB detail","wp"],
[1322,"Best buffet seating VIP treatment","p"],
[1323,"Nightly turndown service tier benefit shown","bp"],
[1324,"Early access giveaway excitement morning","p"],
[1325,"Cruise reward dream destination montage","p"],
[1326,"Boyd Rewards app screen UI close-up","p"],
[1327,"Loyalty card in wallet real guest moment","p"],
[1328,"Points-to-play conversion slot activation","p"],
[1329,"New member signup process at desk","p"],
[1330,"Multi-property Boyd network destination map","p"],
[1331,"Anniversary reward special recognition","p"],
[1332,"Birthday celebration comp surprise moment","twbp"],
[1333,"Referral bonus friend-brings-friend energy","p"],
[1334,"Rewards tier comparison side-by-side graphic","p"],
[1335,"All Right Here tagline integration moment","p"],
// === LOCAL & SEASONAL ILLINOIS RIVER VALLEY (1336-1370) ===
[1336,"Peoria skyline from East Peoria at dusk","p"],
[1337,"Illinois River fog dawn atmospheric slow","p"],
[1338,"Autumn foliage along riverfront drive","p"],
[1339,"Winter snow on property exterior warm contrast","p"],
[1340,"Spring blooms along Blackjack Blvd approach","p"],
[1341,"Summer patio energy outdoor dining golden hour","twbp"],
[1342,"Central Illinois prairie golden hour light","p"],
[1343,"Mayfly season atmospheric night exterior","p"],
[1344,"Peoria civic center skyline night establishing","p"],
[1345,"Greater Peoria Airport arrival to property journey","p"],
[1346,"Route 116 drive approaching East Peoria","p"],
[1347,"Illinois River barge passing property backdrop","p"],
[1348,"Fondulac park adjacent nature greenery","p"],
[1349,"Local craft beer tap handle detail Central IL","tp"],
[1350,"Friday night East Peoria nightlife energy","twbp"],
[1351,"Sunday brunch peaceful morning river light","twbp"],
[1352,"Harvest season autumn Central Illinois warmth","twp"],
[1353,"Holiday decorations on property festive exterior","p"],
[1354,"New Year's Eve celebration property countdown","twbp"],
[1355,"Valentine's date night couple arriving","wbp"],
[1356,"St. Patrick's Day green themed event night","tp"],
[1357,"Mother's Day brunch special service moment","twbp"],
[1358,"Fourth of July riverfront fireworks property","p"],
[1359,"Halloween costume casino night themed event","tp"],
[1360,"Thanksgiving dinner family gathering WB","wp"],
[1361,"Christmas lights on property exterior festive","p"],
[1362,"March Madness sportsbook energy packed house","p"],
[1363,"NFL Sunday FanDuel screens crowd reaction","p"],
[1364,"Local band performing Tin Lizard weekend","t"],
[1365,"Karaoke Thursday night energy crowd singing","t"],
[1366,"East Peoria community event at property","p"],
[1367,"Bradley University game day spillover energy","tp"],
[1368,"Illinois Central College nearby establishing","p"],
[1369,"Central Illinois hospitality genuine warmth","twbnp"],
[1370,"All Right Here brand moment property pride","twbnp"],
];

const outletKey = { t: "tl", w: "wb", n: "nd", b: "bb", p: "pad" };

// === EQUIPMENT REGISTRY ===
const equipment = [
  // Cameras
  { id: "ursa", name: "URSA 12K", cat: "camera", tags: ["cinema", "hero", "detail", "slow-mo"], desc: "Blackmagic cinema camera" },
  { id: "r5c", name: "Canon R5C", cat: "camera", tags: ["hybrid", "photo", "video", "handheld", "texture"], desc: "Hybrid photo/video" },
  { id: "zv4", name: "Sony ZV-4", cat: "camera", tags: ["compact", "handheld", "bts", "energy", "pov"], desc: "Compact video camera" },
  { id: "mavic4", name: "Mavic 4 Pro", cat: "camera", tags: ["aerial", "drone", "space", "exterior", "cinematic"], desc: "100MP cinematic aerial" },
  { id: "mini4", name: "Mini 4 Pro", cat: "camera", tags: ["aerial", "drone", "interior", "compact", "indoor"], desc: "Lightweight indoor drone" },
  { id: "matrice", name: "Matrice 4TD", cat: "camera", tags: ["aerial", "thermal", "mapping", "rtk", "photogrammetry"], desc: "Thermal + RTK mapping platform" },
  { id: "osmo360", name: "Osmo 360 8K", cat: "camera", tags: ["360", "immersive", "space", "vr", "virtual-tour"], desc: "360° 8K camera" },
  // Lenses
  { id: "1635", name: "Canon 16–35mm L", cat: "lens", tags: ["wide", "space", "architecture", "reveal"], desc: "Wide angle zoom" },
  { id: "2470", name: "Canon 24–70mm L", cat: "lens", tags: ["standard", "hero", "versatile", "portrait"], desc: "Standard workhorse" },
  { id: "100400", name: "Canon 100–400mm L", cat: "lens", tags: ["telephoto", "compression", "detail", "candid"], desc: "Telephoto zoom" },
  { id: "tse24", name: "Canon TS-E 24mm", cat: "lens", tags: ["tilt-shift", "architecture", "miniature", "space"], desc: "Tilt-shift wide" },
  { id: "tse90", name: "Canon TS-E 90mm", cat: "lens", tags: ["tilt-shift", "product", "detail", "selective-focus"], desc: "Tilt-shift portrait" },
  { id: "z85", name: "Zeiss 85mm", cat: "lens", tags: ["portrait", "hero", "bokeh", "beauty"], desc: "Zeiss prime" },
  { id: "z100", name: "Zeiss 100mm", cat: "lens", tags: ["macro", "detail", "texture", "food"], desc: "Zeiss macro prime" },
  { id: "2x", name: "2× Teleconverter", cat: "lens", tags: ["telephoto", "reach", "compression"], desc: "Doubles focal length" },
  // Motion
  { id: "rs3", name: "DJI RS3 Pro", cat: "motion", tags: ["gimbal", "tracking", "walk", "orbit", "follow"], desc: "3-axis cinema gimbal" },
  { id: "weebill", name: "Weebill Gimbal", cat: "motion", tags: ["gimbal", "compact", "handheld", "energy"], desc: "Compact stabilizer" },
  { id: "gvm", name: "GVM Slider", cat: "motion", tags: ["slider", "lateral", "push", "pull", "parallax"], desc: "Camera slider" },
  { id: "turntable-lg", name: "Large Turntable", cat: "motion", tags: ["turntable", "orbit", "product", "360"], desc: "Motorized large turntable" },
  { id: "turntable-sm", name: "Small Turntable", cat: "motion", tags: ["turntable", "product", "detail", "food"], desc: "Motorized small turntable" },
  { id: "turntable-3", name: "Turntable 3", cat: "motion", tags: ["turntable", "product", "scanning"], desc: "Third motorized turntable" },
  // Lighting
  { id: "sl300", name: "Godox SL300", cat: "lighting", tags: ["key", "high-output", "hard", "spotlight"], desc: "300W LED" },
  { id: "sl200bi", name: "Godox SL200BI", cat: "lighting", tags: ["bicolor", "key", "fill", "warm", "cool"], desc: "200W bi-color LED" },
  { id: "sl100", name: "Godox SL100", cat: "lighting", tags: ["fill", "accent", "practical"], desc: "100W LED" },
  { id: "godox200batt", name: "Godox 200W Battery", cat: "lighting", tags: ["portable", "location", "battery", "fill"], desc: "200W battery LED" },
  { id: "fresnel", name: "Fresnel Modifiers ×2", cat: "lighting", tags: ["hard", "spotlight", "shaped", "dramatic"], desc: "Fresnel lens attachments" },
  { id: "softbox", name: "Softboxes", cat: "lighting", tags: ["soft", "diffused", "beauty", "food", "fill"], desc: "Multiple softboxes" },
  { id: "boom", name: "Boom Stands ×2", cat: "lighting", tags: ["overhead", "hair", "rim", "positioned"], desc: "Boom arm light stands" },
  // Audio
  { id: "f3", name: "Zoom F3", cat: "audio", tags: ["field", "compact", "32bit", "ambient"], desc: "32-bit float recorder" },
  { id: "zoom6", name: "Zoom 6-Input", cat: "audio", tags: ["multi-channel", "interview", "music"], desc: "6-channel recorder" },
  { id: "djmic2", name: "DJI Mic 2", cat: "audio", tags: ["wireless", "lav", "interview", "bts"], desc: "Wireless lavalier" },
  { id: "tlm102", name: "Neumann TLM 102", cat: "audio", tags: ["vocal", "voiceover", "studio", "narration"], desc: "Large diaphragm condenser" },
  { id: "km184", name: "Neumann KM184 ×2", cat: "audio", tags: ["stereo", "ambient", "music", "detail"], desc: "Matched pair SDC" },
  { id: "smic3", name: "Deity S-Mic 3 ×2", cat: "audio", tags: ["shotgun", "dialogue", "directed", "boom"], desc: "Shotgun microphones" },
  { id: "clippy", name: "Clippy EM258", cat: "audio", tags: ["stealth", "ambient", "asmr", "foley"], desc: "Matched pair mini mics" },
  // Support
  { id: "tripod", name: "Tripods (Benro/SmallRig)", cat: "support", tags: ["static", "locked", "photo", "video"], desc: "Standard tripods" },
  { id: "heavytri", name: "Heavy Duty Tripod", cat: "support", tags: ["cinema", "heavy", "ursa", "stable"], desc: "100lb capacity" },
  { id: "hihat", name: "Hi-Hat Tripod", cat: "support", tags: ["low", "ground", "worms-eye", "tabletop"], desc: "Low-profile mount" },
  { id: "cart", name: "Production Cart", cat: "support", tags: ["transport", "staging", "mobile"], desc: "Foldable field cart" },
];

// Map shot beat types to equipment tag preferences (ordered by priority)
const beatGearTags = {
  hook:   { camera: ["cinema", "hybrid"], lens: ["macro", "detail", "wide"], motion: ["slider", "gimbal"], lighting: ["hard", "spotlight", "dramatic"], audio: ["foley", "asmr", "ambient"] },
  reveal: { camera: ["cinema", "hybrid", "drone"], lens: ["wide", "standard"], motion: ["slider", "gimbal", "tracking"], lighting: ["bicolor", "key"], audio: ["ambient", "stereo"] },
  hero:   { camera: ["cinema", "hybrid"], lens: ["standard", "portrait", "bokeh", "beauty"], motion: ["slider", "turntable"], lighting: ["key", "soft", "bicolor", "beauty"], audio: ["ambient", "foley"] },
  detail: { camera: ["hybrid", "cinema"], lens: ["macro", "detail", "texture", "food", "selective-focus"], motion: ["slider", "turntable"], lighting: ["soft", "bicolor", "accent"], audio: ["foley", "asmr"] },
  energy: { camera: ["compact", "hybrid", "handheld"], lens: ["standard", "wide", "versatile"], motion: ["gimbal", "compact", "handheld"], lighting: ["portable", "practical"], audio: ["wireless", "lav", "ambient", "stealth"] },
  space:  { camera: ["drone", "aerial", "cinema", "360"], lens: ["wide", "tilt-shift", "architecture"], motion: ["gimbal", "tracking", "slider"], lighting: ["high-output", "key"], audio: ["stereo", "ambient"] },
  closer: { camera: ["cinema", "hybrid"], lens: ["standard", "wide"], motion: ["slider"], lighting: ["key", "soft"], audio: ["ambient"] },
};

// Style name → extra gear tag hints (keyword matching)
const styleGearHints = [
  [/tilt.?shift|miniature/i, ["tilt-shift"]],
  [/macro|extreme close|texture fill/i, ["macro", "detail"]],
  [/orbit|360|circle/i, ["turntable", "gimbal", "360"]],
  [/slider|lateral|parallax|push.?in|pull.?back/i, ["slider"]],
  [/gimbal|steadicam|follow|tracking|walk/i, ["gimbal", "tracking"]],
  [/drone|aerial|overhead.*(property|venue)|crane.*ascent/i, ["drone", "aerial"]],
  [/handheld|documentary|pov/i, ["handheld", "compact"]],
  [/slow.?mo|phantom|1000fps/i, ["cinema", "slow-mo"]],
  [/locked|static/i, ["static"]],
  [/low.*angle|worm|ground|hi.?hat/i, ["low", "ground"]],
  [/asmr|crunch|sizzle|foley/i, ["asmr", "foley", "stealth"]],
  [/bokeh|shallow/i, ["bokeh", "portrait"]],
  [/wide.*shot|architecture|venue/i, ["wide", "architecture"]],
  [/telephoto|compression|candid/i, ["telephoto", "compression"]],
  [/neon|blacklight|uv/i, ["hard", "spotlight"]],
  [/candle|single.*light|rim/i, ["accent", "practical"]],
  [/voiceover|narration/i, ["vocal", "voiceover", "studio"]],
  [/interview|testimonial/i, ["wireless", "lav", "shotgun"]],
  [/music|band|live/i, ["multi-channel", "stereo", "music"]],
  [/turntable|product.*spin/i, ["turntable", "product"]],
  [/drone.*interior|mini.*drone|indoor.*drone/i, ["drone", "interior", "compact"]],
  [/mavic|100mp|high.?res|ortho/i, ["drone", "aerial"]],
  [/matrice|thermal|mapping|rtk/i, ["aerial", "thermal", "mapping"]],
  [/fpv|immersive.*fly|fly.?through/i, ["drone", "aerial"]],
  [/orbit.*drone|drone.*orbit|reveal.*flight|aerial.*orbit/i, ["drone", "aerial"]],
  [/360|immersive|virtual.*tour|spatial/i, ["360", "immersive"]],
  [/point.*cloud|photogrammetry|3d.*scan|digital.*twin|gaussian/i, ["photogrammetry", "3d"]],
  [/thermal|heat.*map|infrared|night.*vision/i, ["thermal"]],
  [/multi.?cam|dual.?cam|triple|simultaneous|synced/i, ["multi-channel"]],
  [/bts|behind.*scene|setup|gear.*lay|how.*we.*made/i, ["handheld", "compact"]],
  [/poll|swipe|interactive|tiktok|stitch|duet|carousel/i, ["compact", "handheld"]],
];

function getGearForShot(beatKey, styles, limit = 6) {
  const prefs = beatGearTags[beatKey?.toLowerCase()] || beatGearTags.hero;
  // Collect extra tags from styles
  const extraTags = [];
  for (const s of (styles || [])) {
    const name = s[1] || "";
    for (const [pattern, tags] of styleGearHints) {
      if (pattern.test(name)) extraTags.push(...tags);
    }
  }
  const scored = equipment.map(eq => {
    const catPrefs = prefs[eq.cat];
    let score = 0;
    if (catPrefs) {
      for (const tag of eq.tags) {
        const idx = catPrefs.indexOf(tag);
        if (idx >= 0) score += (catPrefs.length - idx);
      }
    }
    // Bonus from style hints
    for (const tag of extraTags) {
      if (eq.tags.includes(tag)) score += 3;
    }
    return { eq, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
  const result = [];
  const catCount = {};
  for (const { eq } of scored) {
    const cc = catCount[eq.cat] || 0;
    if (cc < 1 && result.length < limit) {
      result.push(eq);
      catCount[eq.cat] = cc + 1;
    }
  }
  return result;
}

// === VENUE DETAILS (real Par-A-Dice specifics) ===
const venueDetails = {
  tl: {
    dishes: ["Lizard Bites", "wood-fired pizza", "smash burger", "loaded nachos", "wings", "fish tacos", "pretzel bites", "onion rings"],
    drinks: ["craft IPA on tap", "house margarita", "old fashioned", "Bud Light draft", "whiskey sour", "local craft beer flight"],
    spaces: ["the bar top", "neon-lit booths", "the stage", "the patio", "the pool table corner", "the jukebox wall"],
    moments: ["band loading in", "bartender shaking a tin", "friends splitting a pizza", "karaoke singer stepping up", "darts game in progress", "server running wings to a booth"],
    textures: ["neon glow on wet bar top", "condensation on a pint glass", "chalk dust on the pool cue", "guitar pick on the stage floor", "grease sheen on a pizza box"],
  },
  wb: {
    dishes: ["bone-in ribeye", "pan-seared sea bass", "lobster tail", "wedge salad", "crème brûlée", "shrimp cocktail", "filet mignon", "chocolate lava cake"],
    drinks: ["Cabernet Sauvignon pour", "tableside martini", "single malt scotch neat", "champagne flute", "craft old fashioned", "wine flight"],
    spaces: ["the dining room", "the wine display", "white tablecloths", "the host stand", "candlelit two-top", "the private dining room"],
    moments: ["sommelier presenting a bottle", "steak arriving at the table", "a couple toasting", "the crème brûlée torch", "waiter folding a napkin", "cork being pulled"],
    textures: ["butter melting on a steak", "wine legs on crystal", "linen napkin fold", "candlelight on silverware", "cracked pepper falling"],
  },
  nd: {
    dishes: ["turkey club", "Italian sub", "grilled chicken wrap", "garden salad", "chips and pickle", "soup of the day"],
    drinks: ["fountain soda", "iced tea", "bottled water", "fresh coffee"],
    spaces: ["the counter", "grab-and-go display", "the menu board", "a high-top by the window"],
    moments: ["sandwich being wrapped", "ticket printing", "tray sliding across the counter", "guest grabbing napkins"],
    textures: ["crispy lettuce crunch", "deli paper crinkling", "steam from fresh soup", "ice hitting a cup"],
  },
  pad: {
    dishes: ["buffet spread", "late-night snacks", "casino floor cocktail"],
    drinks: ["complimentary drinks on the floor", "champagne for a jackpot winner", "coffee at the poker table"],
    spaces: ["the casino floor", "slot machine rows", "the FanDuel Sportsbook", "the hotel lobby", "the riverboat exterior at night", "the parking lot entrance", "the riverboat silhouette on the river", "the marquee sign", "the high-limit area", "the four-deck riverboat", "the gangway entrance", "21 Blackjack Blvd"],
    moments: ["dice bouncing on felt", "chips stacking", "slot machine hitting jackpot", "a guest checking in", "the valet opening a door", "the marquee lighting up at dusk", "shuttle arriving from hotel", "Boyd Rewards card scanning", "touchdown on the sportsbook screens", "progressive jackpot ticking up"],
    textures: ["green felt under overhead light", "chip edges catching light", "carpet pattern repeating", "elevator doors reflecting lobby light", "rain on the entrance canopy", "river reflection of casino neon", "slot machine button panel glow", "riverboat hull at waterline"],
  },
  bb: {
    dishes: ["charcuterie board", "bar snacks", "late-night small plates", "dessert from William B's"],
    drinks: ["single malt scotch neat", "craft old fashioned", "Cabernet pour", "specialty cocktail of the week", "local craft beer", "champagne flute", "espresso martini", "wine by the glass"],
    spaces: ["the lounge bar", "leather seating area", "the cocktail rail", "the back corner booth", "the art deco mirror wall", "window seat with river view"],
    moments: ["bartender crafting a cocktail", "ice sphere cracking in glass", "a quiet toast between two", "checking the phone after a win", "unwinding after the casino floor", "nightcap before heading to the room"],
    textures: ["amber liquid catching bar light", "leather seat creak", "cocktail napkin fold", "condensation on a rocks glass", "warm wood grain on the bar top", "soft lounge music in the background"],
  },
};

function getVenueDetail(outletId, type) {
  const v = venueDetails[outletId];
  if (!v || !v[type]) return "";
  return pick(v[type]);
}

function getStylesForOutlet(outletId) {
  const key = { tl: "t", wb: "w", nd: "n", bb: "b", pad: "p" }[outletId];
  return S.filter(s => s[2].includes(key));
}

function getStylesForOutletAndCategory(outletId, cat) {
  const key = { tl: "t", wb: "w", nd: "n", bb: "b", pad: "p" }[outletId];
  return S.filter(s => s[2].includes(key) && s[0] >= cat.range[0] && s[0] <= cat.range[1]);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// === SMART GENERATION ENGINE ===

// Category mood profiles: [pace, energy, warmth, sophistication, playfulness]
// 0 = low/cool/raw/serious, 1 = high/hot/polished/playful
const catProfiles = {
  1:  [0.4, 0.3, 0.5, 0.5, 0.7], // Typography — moderate, creative
  2:  [0.7, 0.7, 0.4, 0.4, 0.6], // Reveals — fast, energetic
  3:  [0.5, 0.4, 0.5, 0.6, 0.3], // Camera — neutral, technical
  4:  [0.3, 0.3, 0.7, 0.6, 0.2], // Lighting — slow, atmospheric
  5:  [0.6, 0.6, 0.4, 0.4, 0.5], // Motion/Time — varied energy
  6:  [0.3, 0.2, 0.6, 0.5, 0.3], // Textures — slow, tactile
  7:  [0.5, 0.5, 0.7, 0.4, 0.5], // Practical Effects — hands-on
  8:  [0.5, 0.5, 0.3, 0.5, 0.6], // Graphics — designed, creative
  9:  [0.4, 0.4, 0.6, 0.5, 0.4], // Narrative — story-driven
  10: [0.3, 0.3, 0.6, 0.7, 0.2], // Color Grade — mood-setting
  11: [0.5, 0.5, 0.5, 0.4, 0.4], // Sound — matches everything
  12: [0.4, 0.4, 0.8, 0.5, 0.4], // Food Cinema — warm, appetizing
  13: [0.3, 0.3, 0.4, 0.7, 0.2], // Architecture — slow, grand
  14: [0.6, 0.6, 0.7, 0.3, 0.6], // Human/Lifestyle — warm, social
  15: [0.5, 0.4, 0.3, 0.6, 0.4], // AI/Digital — technical
  16: [0.4, 0.4, 0.7, 0.4, 0.5], // Analog/Retro — warm, nostalgic
  17: [0.6, 0.6, 0.5, 0.4, 0.5], // Seasonal — event energy
  18: [0.4, 0.3, 0.4, 0.6, 0.4], // Logo — brand-focused
  19: [0.4, 0.5, 0.4, 0.7, 0.3], // Aerial/Drone — cinematic, grand
  20: [0.3, 0.4, 0.5, 0.6, 0.3], // 360/Immersive — slow, explorative
  21: [0.3, 0.3, 0.3, 0.8, 0.2], // Photogrammetry/3D — technical, premium
  22: [0.4, 0.5, 0.4, 0.7, 0.4], // Thermal — novelty, technical
  23: [0.5, 0.5, 0.5, 0.5, 0.3], // Multi-cam — neutral, coverage
  24: [0.7, 0.7, 0.6, 0.2, 0.8], // Interactive/Social — fast, playful
  25: [0.5, 0.5, 0.6, 0.3, 0.6], // BTS/Process — authentic, relatable
  26: [0.3, 0.4, 0.5, 0.7, 0.2], // Riverboat/Waterfront — cinematic, grand, slow
  27: [0.6, 0.7, 0.4, 0.5, 0.5], // Gaming Floor — energetic, exciting, balanced
  28: [0.3, 0.3, 0.8, 0.7, 0.2], // Hotel/Guest — warm, refined, intimate
  29: [0.5, 0.5, 0.5, 0.5, 0.5], // Boyd Rewards — neutral, versatile
  30: [0.4, 0.4, 0.6, 0.5, 0.3], // Local/Seasonal — grounded, warm, authentic
};

// Per-style energy nudges based on outlet mapping
// If a style maps to WB → nudge sophistication up, energy down
// If a style maps to TL → nudge energy/playfulness up
// If a style maps to ND → nudge pace up
function getStyleProfile(style) {
  const catId = categories.find(c => style[0] >= c.range[0] && style[0] <= c.range[1])?.id || 1;
  const base = [...catProfiles[catId]];
  const o = style[2];
  // Nudge based on outlet affinity
  if (o.includes("w") && !o.includes("t")) { base[3] += 0.15; base[1] -= 0.1; base[0] -= 0.1; } // WB-exclusive: more sophisticated, slower
  if (o.includes("t") && !o.includes("w")) { base[1] += 0.1; base[4] += 0.1; } // TL-exclusive: more energetic, playful
  if (o.includes("n")) { base[0] += 0.1; } // ND: faster
  if (o.includes("p") && o.length === 1) { base[3] += 0.1; base[1] += 0.1; } // PAD-exclusive: bold + sophisticated
  if (o.includes("b")) { base[2] += 0.1; base[3] += 0.1; base[0] -= 0.05; } // BB: warmer, more sophisticated, slightly slower
  // Clamp 0-1
  return base.map(v => Math.max(0, Math.min(1, v)));
}

// Brand target profiles: [pace, energy, warmth, sophistication, playfulness]
const brandTargets = {
  tl:  [0.65, 0.75, 0.7, 0.25, 0.8],  // fast, loud, warm, casual, fun
  wb:  [0.2, 0.25, 0.75, 0.9, 0.15],   // slow, quiet, warm, refined, serious
  nd:  [0.85, 0.6, 0.5, 0.1, 0.6],     // very fast, moderate energy, neutral, casual
  bb:  [0.3, 0.35, 0.8, 0.75, 0.25],   // slow, calm, very warm, sophisticated, relaxed
  pad: [0.5, 0.7, 0.5, 0.7, 0.4],      // moderate pace, high energy, balanced, prestigious
};

function cosine(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

function centroid(profiles) {
  if (profiles.length === 0) return [0.5, 0.5, 0.5, 0.5, 0.5];
  const dims = profiles[0].length;
  const result = new Array(dims).fill(0);
  for (const p of profiles) for (let i = 0; i < dims; i++) result[i] += p[i];
  return result.map(v => v / profiles.length);
}

// Hard conflicts: style IDs that should never pair
// [setA_range, setB_range] — styles from these ranges conflict
const conflicts = [
  [[151, 151], [155, 155]], // Single candle vs Blacklight UV
  [[201, 201], [234, 234]], // Stop motion vs Unbroken take
  [[209, 209], [210, 210]], // Phantom slow-mo vs Strobe staccato
  [[503, 503], [501, 501]], // High-key bright vs Neon noir
  [[151, 151], [170, 170]], // Single candle vs Strobe flash
  [[583, 583], [551, 551]], // Whispered ASMR vs Beat-synced cuts
  [[136, 136], [117, 117]], // Circular dolly vs Whip pan
];

function hasConflict(styleA, styleB) {
  for (const [rangeA, rangeB] of conflicts) {
    if ((styleA[0] >= rangeA[0] && styleA[0] <= rangeA[1] && styleB[0] >= rangeB[0] && styleB[0] <= rangeB[1]) ||
        (styleB[0] >= rangeA[0] && styleB[0] <= rangeA[1] && styleA[0] >= rangeB[0] && styleA[0] <= rangeB[1])) {
      return true;
    }
  }
  return false;
}

// Temperature-weighted selection
function weightedPick(candidates, scores, temperature) {
  if (candidates.length === 0) return null;
  if (temperature <= 0.05) {
    const maxIdx = scores.indexOf(Math.max(...scores));
    return candidates[maxIdx];
  }
  const adjusted = scores.map(s => Math.pow(Math.max(s, 0.01), 1 / Math.max(temperature, 0.1)));
  const total = adjusted.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= adjusted[i];
    if (r <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}

// The recipe slots
const recipeSlots = [
  { label: "Narrative", catIds: [9], required: true, isSeed: true },
  { label: "Camera", catIds: [3], required: true },
  { label: "Lighting", catIds: [4], required: true },
  { label: "Color Grade", catIds: [10], required: true },
  { label: "Practical Effect", catIds: [7, 12], required: true },
  { label: "Sound", catIds: [11], required: false },
  { label: "Typography", catIds: [1], required: false },
  { label: "Transition", catIds: [2], required: false },
  { label: "Motion", catIds: [5], required: false },
  { label: "Texture", catIds: [6], required: false },
  { label: "Graphic Treatment", catIds: [8], required: false },
  { label: "Logo", catIds: [18], required: false },
];

function generateRecipe(outletId, temperature) {
  const key = { tl: "t", wb: "w", nd: "n", bb: "b", pad: "p" }[outletId];
  const brandTarget = brandTargets[outletId];
  const recipe = [];
  const selectedProfiles = [];

  // Shuffle non-seed slots for variety
  const seedSlot = recipeSlots.find(s => s.isSeed);
  const otherSlots = recipeSlots.filter(s => !s.isSeed).sort(() => Math.random() - 0.5);
  const ordered = [seedSlot, ...otherSlots];

  for (const slot of ordered) {
    // Gather pool
    const pool = [];
    for (const catId of slot.catIds) {
      const cat = categories.find(c => c.id === catId);
      if (cat) {
        pool.push(...S.filter(s => s[2].includes(key) && s[0] >= cat.range[0] && s[0] <= cat.range[1]));
      }
    }
    if (pool.length === 0) continue;

    // Optional slots: skip chance inversely proportional to temperature
    // Low temp = more slots filled (complete recipe), high temp = looser
    if (!slot.required && Math.random() > 0.5 + (1 - temperature) * 0.2) continue;

    // Filter out conflicts with already-selected styles
    const safe = pool.filter(candidate =>
      !recipe.some(r => hasConflict(candidate, r.style))
    );
    if (safe.length === 0) continue;

    // Score each candidate
    const profiles = safe.map(s => getStyleProfile(s));
    const scores = safe.map((s, i) => {
      const prof = profiles[i];
      // Brand alignment
      const brandScore = cosine(prof, brandTarget);
      // Harmony with existing selections
      let harmonyScore = 1;
      if (selectedProfiles.length > 0) {
        const recipeCentroid = centroid(selectedProfiles);
        harmonyScore = cosine(prof, recipeCentroid);
      }
      // Combined: weight brand more at low temperature, harmony more at high
      const brandWeight = 0.6 - temperature * 0.3;
      const harmonyWeight = 0.4 + temperature * 0.3;
      return brandScore * brandWeight + harmonyScore * harmonyWeight;
    });

    const picked = weightedPick(safe, scores, temperature);
    if (picked) {
      recipe.push({ slot: slot.label, style: picked });
      selectedProfiles.push(getStyleProfile(picked));
    }
  }

  return recipe;
}

// Compute coherence score for a recipe + outlet
function computeCoherence(recipe, outletId) {
  if (recipe.length < 2) return 1;
  const brandTarget = brandTargets[outletId];
  const profiles = recipe.map(item => getStyleProfile(item.style));

  // Pairwise harmony (average cosine between all pairs)
  let pairSum = 0, pairCount = 0;
  for (let i = 0; i < profiles.length; i++) {
    for (let j = i + 1; j < profiles.length; j++) {
      pairSum += cosine(profiles[i], profiles[j]);
      pairCount++;
    }
  }
  const harmony = pairCount > 0 ? (pairSum / pairCount + 1) / 2 : 1;

  // Brand alignment
  const recipeCentroid = centroid(profiles);
  const brandAlign = (cosine(recipeCentroid, brandTarget) + 1) / 2;

  // Conflict check
  let conflictFree = 1;
  for (let i = 0; i < recipe.length; i++) {
    for (let j = i + 1; j < recipe.length; j++) {
      if (hasConflict(recipe[i].style, recipe[j].style)) conflictFree = 0;
    }
  }

  return harmony * 0.4 + brandAlign * 0.4 + conflictFree * 0.2;
}

const tempLabels = ["Brand Lock", "On-Brand", "Flexible", "Adventurous", "Wild Card"];

// === MOOD SYSTEM ===
// Each mood adjusts the brand profile: [pace, energy, warmth, sophistication, playfulness]
const moods = [
  { id: "intimate", name: "Intimate Evening", icon: "🕯️", nudge: [-0.2, -0.2, +0.2, +0.15, -0.1], desc: "Candlelight, slow, warm" },
  { id: "highenergy", name: "High Energy", icon: "⚡", nudge: [+0.25, +0.3, 0, -0.1, +0.2], desc: "Fast cuts, loud, alive" },
  { id: "brunch", name: "Sunday Brunch", icon: "☀️", nudge: [-0.1, -0.1, +0.15, 0, +0.1], desc: "Bright, easy, relaxed" },
  { id: "latenight", name: "Late Night", icon: "🌙", nudge: [0, +0.1, -0.1, +0.1, +0.1], desc: "Neon, dark, atmospheric" },
  { id: "luxury", name: "Luxury", icon: "✨", nudge: [-0.15, -0.1, +0.1, +0.3, -0.2], desc: "Slow, refined, aspirational" },
  { id: "fun", name: "Casual Fun", icon: "🎉", nudge: [+0.1, +0.15, +0.1, -0.2, +0.3], desc: "Playful, approachable, real" },
  { id: "cinematic", name: "Cinematic", icon: "🎬", nudge: [-0.1, 0, 0, +0.2, -0.15], desc: "Filmic, dramatic, composed" },
  { id: "raw", name: "Raw & Real", icon: "📹", nudge: [+0.1, +0.1, +0.1, -0.25, +0.1], desc: "Documentary, unpolished, honest" },
];

// Apply mood nudge to a brand target
function applyMood(brandTarget, moodId) {
  if (!moodId) return brandTarget;
  const mood = moods.find(m => m.id === moodId);
  if (!mood) return brandTarget;
  return brandTarget.map((v, i) => Math.max(0, Math.min(1, v + (mood.nudge[i] || 0))));
}

// === CONTEXTUAL LEARNING ENGINE ===
// Each interaction is a signal: { styleId, outlet, mood, beat, timestamp, weight }
// weight: positive = user picked it, negative = user rejected it (compare loser)

const LEARN_KEY = "pad-learn-v2";
const DECAY_HALF_LIFE = 14 * 24 * 60 * 60 * 1000; // 14 days

function loadLearningData() {
  try { return JSON.parse(localStorage.getItem(LEARN_KEY) || '{"signals":[],"version":2}'); }
  catch { return { signals: [], version: 2 }; }
}
function saveLearningData(data) {
  try { localStorage.setItem(LEARN_KEY, JSON.stringify(data)); } catch {}
}

// Export for git sync
function exportLearningJSON() {
  return JSON.stringify(loadLearningData(), null, 2);
}
function importLearningJSON(json) {
  try {
    const data = JSON.parse(json);
    if (data.signals && data.version) {
      // Merge with existing — deduplicate by timestamp
      const existing = loadLearningData();
      const existingTs = new Set(existing.signals.map(s => s.ts));
      const merged = [...existing.signals, ...data.signals.filter(s => !existingTs.has(s.ts))];
      saveLearningData({ signals: merged, version: 2 });
      return merged.length;
    }
  } catch {}
  return -1;
}

// Decay: older signals matter less
function decayWeight(signal) {
  const age = Date.now() - (signal.ts || 0);
  const decay = Math.pow(0.5, age / DECAY_HALF_LIFE);
  return (signal.w || 1) * decay;
}

// Record positive signals (user picked these styles)
function recordStyleUsage(styleIds, context = {}) {
  const data = loadLearningData();
  const ts = Date.now();
  for (const id of styleIds) {
    data.signals.push({
      id, // styleId
      o: context.outlet || null, // outlet
      m: context.mood || null, // mood
      b: context.beat || null, // beat type
      w: context.weight || 1, // signal weight
      ts,
    });
  }
  // Cap at 5000 signals, prune oldest
  if (data.signals.length > 5000) {
    data.signals = data.signals.slice(-4000);
  }
  saveLearningData(data);
}

// Record negative signals (compare loser)
function recordStylePenalty(styleIds, context = {}) {
  recordStyleUsage(styleIds, { ...context, weight: -0.5 });
}

// Get contextual boost for a style given current generation context
function getUsageBoost(styleId, context = {}) {
  const data = loadLearningData();
  if (data.signals.length === 0) return 0;

  let score = 0;
  for (const sig of data.signals) {
    if (sig.id !== styleId) continue;
    let relevance = 1;
    // Context match bonuses
    if (context.outlet && sig.o === context.outlet) relevance += 0.5;
    if (context.mood && sig.m === context.mood) relevance += 0.3;
    if (context.beat && sig.b === context.beat) relevance += 0.2;
    score += decayWeight(sig) * relevance;
  }
  // Normalize: cap at ±0.3
  return Math.max(-0.15, Math.min(0.3, score * 0.05));
}

// Get taste profile summary for display
function getTasteProfile() {
  const data = loadLearningData();
  if (data.signals.length === 0) return null;

  const totalSignals = data.signals.length;
  const positiveSignals = data.signals.filter(s => (s.w || 1) > 0).length;
  const uniqueStyles = new Set(data.signals.map(s => s.id)).size;

  // Top styles by decayed weight
  const styleScores = {};
  for (const sig of data.signals) {
    const dw = decayWeight(sig);
    styleScores[sig.id] = (styleScores[sig.id] || 0) + dw;
  }
  const topStyles = Object.entries(styleScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id]) => S.find(s => s[0] === parseInt(id)))
    .filter(Boolean);

  // Outlet preferences
  const outletScores = {};
  for (const sig of data.signals) {
    if (sig.o) outletScores[sig.o] = (outletScores[sig.o] || 0) + decayWeight(sig);
  }

  // Mood preferences
  const moodScores = {};
  for (const sig of data.signals) {
    if (sig.m) moodScores[sig.m] = (moodScores[sig.m] || 0) + decayWeight(sig);
  }

  // Category tendencies
  const catScores = {};
  for (const sig of data.signals) {
    const cat = categories.find(c => sig.id >= c.range[0] && sig.id <= c.range[1]);
    if (cat) catScores[cat.id] = (catScores[cat.id] || 0) + decayWeight(sig);
  }
  const topCats = Object.entries(catScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id]) => categories.find(c => c.id === parseInt(id)))
    .filter(Boolean);

  // Oldest signal age
  const oldest = data.signals.length > 0 ? Math.min(...data.signals.map(s => s.ts)) : Date.now();
  const daysSinceFirst = Math.floor((Date.now() - oldest) / (24 * 60 * 60 * 1000));

  return { totalSignals, positiveSignals, uniqueStyles, topStyles, outletScores, moodScores, topCats, daysSinceFirst };
}

// Legacy migration: convert old pad-usage to v2
(function migrateLegacy() {
  try {
    const old = JSON.parse(localStorage.getItem("pad-usage") || "null");
    if (old && typeof old === "object" && !old.version) {
      const data = loadLearningData();
      const ts = Date.now() - 86400000; // backdate 1 day
      for (const [id, count] of Object.entries(old)) {
        for (let i = 0; i < Math.min(count, 10); i++) {
          data.signals.push({ id: parseInt(id), o: null, m: null, b: null, w: 1, ts: ts + i });
        }
      }
      saveLearningData(data);
      localStorage.removeItem("pad-usage");
    }
  } catch {}
})();

// Persistence helper
function usePersistedState(key, defaultVal) {
  const [state, setState] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : defaultVal; }
    catch { return defaultVal; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} }, [key, state]);
  return [state, setState];
}

// Fuzzy search
function fuzzyMatch(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return 2;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length ? 1 : 0;
}

// === STORYBOARD ENGINE ===

// Shot beats define the narrative arc of an ad
// Each beat type has: role, typical duration range, which style categories to pull from
const shotBeats = {
  hook:    { role: "HOOK",    durRange: [1, 2],  catPri: [7, 12, 22, 27], catSec: [3, 4, 24],       desc: "Thumb-stopper. Extreme detail, dramatic action." },
  reveal:  { role: "REVEAL",  durRange: [2, 3],  catPri: [2, 3, 19, 26], catSec: [4, 5, 20, 30],   desc: "Pull back, show context. Transition into the space." },
  hero:    { role: "HERO",    durRange: [3, 5],  catPri: [12, 3, 27], catSec: [4, 10, 23],          desc: "The money shot. What you're selling." },
  detail:  { role: "DETAIL",  durRange: [2, 3],  catPri: [7, 12, 22, 29], catSec: [6, 3, 21, 28],  desc: "Supporting texture. Sensory close-up." },
  energy:  { role: "ENERGY",  durRange: [2, 3],  catPri: [14, 5, 23, 24, 27], catSec: [11, 3, 25], desc: "Movement, people, life. The vibe." },
  space:   { role: "SPACE",   durRange: [2, 4],  catPri: [13, 4, 19, 20, 26, 28], catSec: [10, 3, 21, 30], desc: "Architecture, ambiance, the room itself." },
  closer:  { role: "CLOSER",  durRange: [2, 3],  catPri: [18, 1, 29], catSec: [10, 2, 25],          desc: "Logo reveal + CTA. End on brand." },
};

// Outlet-specific ad structures — beats scale with duration tier
const adStructures = {
  tl: {
    name: "Tin Lizard",
    paceMultiplier: 0.7,
    beatsByTier: {
      quick:    ["hook", "hero", "energy", "closer"],
      short:    ["hook", "reveal", "hero", "detail", "energy", "closer"],
      standard: ["hook", "reveal", "hero", "detail", "energy", "detail", "hero", "closer"],
      long:     ["hook", "reveal", "hero", "detail", "energy", "space", "hero", "detail", "energy", "closer"],
    },
    subjects: ["pizza", "burger", "wings", "craft cocktail", "beer flight", "nachos", "live band", "karaoke night", "pretzel", "neon sign"],
    hooks: [
      "Your night starts here.",
      "Friday never tasted this good.",
      "Live music. Cold beer. Hot food.",
      "This is what you've been craving.",
      "Thursday nights hit different.",
      "Come hungry. Leave happy.",
    ],
    ctas: [
      "See you tonight 🦎",
      "Every Thursday — karaoke night",
      "Bands every Friday & Saturday",
      "21 Blackjack Blvd, East Peoria",
      "Tag someone who needs this",
      "Save this for your next night out",
    ],
    captionStyle: "casual, fun, friend-inviting-you-out energy"
  },
  wb: {
    name: "William B's",
    paceMultiplier: 1.5,
    beatsByTier: {
      quick:    ["hook", "hero", "detail", "closer"],
      short:    ["hook", "space", "hero", "detail", "closer"],
      standard: ["hook", "space", "hero", "detail", "hero", "detail", "energy", "closer"],
      long:     ["hook", "space", "hero", "detail", "energy", "space", "hero", "detail", "hero", "energy", "closer"],
    },
    subjects: ["ribeye steak", "sea bass", "wine pour", "craft cocktail", "crème brûlée", "lobster tail", "tableside Caesar", "charcuterie board"],
    hooks: [
      "You deserve this.",
      "Founded on Flavor.",
      "Some nights call for something special.",
      "This is not dinner. This is an experience.",
      "The reservation you've been meaning to make.",
    ],
    ctas: [
      "Make a reservation",
      "Link in bio — OpenTable",
      "Special occasions start here",
      "William B's Steakhouse at Par-A-Dice",
      "Tag your plus one",
    ],
    captionStyle: "refined, aspirational but not stuffy, makes you want to book"
  },
  nd: {
    name: "Nelson's Deli",
    paceMultiplier: 0.5,
    beatsByTier: {
      quick:    ["hook", "hero", "closer"],
      short:    ["hook", "hero", "detail", "closer"],
      standard: ["hook", "hero", "detail", "energy", "hero", "closer"],
      long:     ["hook", "reveal", "hero", "detail", "energy", "hero", "detail", "closer"],
    },
    subjects: ["deli sandwich", "fresh wrap", "burger", "salad", "coffee"],
    hooks: [
      "Grab. Go. Win.",
      "Fuel up between hands.",
      "Quick. Fresh. Done.",
      "Don't let hunger slow your streak.",
    ],
    ctas: [
      "Open daily at Par-A-Dice",
      "Counter service, casino speed",
      "Your pit stop between jackpots",
    ],
    captionStyle: "short, punchy, functional, no fluff"
  },
  bb: {
    name: "Bourbon's",
    paceMultiplier: 1.4,
    beatsByTier: {
      quick:    ["hook", "hero", "detail", "closer"],
      short:    ["hook", "space", "hero", "detail", "closer"],
      standard: ["hook", "space", "hero", "detail", "energy", "detail", "closer"],
      long:     ["hook", "space", "hero", "detail", "energy", "space", "hero", "detail", "closer"],
    },
    subjects: ["craft cocktail", "scotch neat", "espresso martini", "wine pour", "charcuterie board", "nightcap", "post-game drink", "hotel lounge atmosphere"],
    hooks: [
      "The night's not over yet.",
      "This is where winners unwind.",
      "One more. You've earned it.",
      "The best seat in the house.",
      "Where the evening exhales.",
    ],
    ctas: [
      "Bourbon's at Par-A-Dice Hotel",
      "Open nightly",
      "Your after-hours destination",
      "21 Blackjack Blvd, East Peoria",
      "Tag your drinking buddy",
    ],
    captionStyle: "warm, intimate, grown-up nightlife, understated luxury"
  },
  pad: {
    name: "Par-A-Dice",
    paceMultiplier: 1.2,
    beatsByTier: {
      quick:    ["hook", "energy", "hero", "closer"],
      short:    ["hook", "space", "energy", "hero", "closer"],
      standard: ["hook", "space", "energy", "hero", "space", "detail", "energy", "closer"],
      long:     ["hook", "space", "energy", "hero", "space", "detail", "energy", "space", "hero", "energy", "closer"],
    },
    subjects: ["casino floor", "slot machines", "blackjack table", "riverboat exterior", "hotel lobby", "FanDuel Sportsbook", "Boyd Rewards", "jackpot moment", "roulette wheel", "the four-deck riverboat"],
    hooks: [
      "East Peoria's best-kept secret.",
      "Your lucky night starts now.",
      "More than a casino.",
      "Where the Illinois River meets Lady Luck.",
      "The only place you need to be tonight.",
      "Docked on the river. Loaded with luck.",
      "All. Right. Here.",
    ],
    ctas: [
      "Join Boyd Rewards — link in bio",
      "21 Blackjack Blvd, East Peoria",
      "Book your stay",
      "See what's playing this weekend",
      "Follow for more from the floor",
      "550+ slots. 18 table games. Free admission.",
    ],
    captionStyle: "exciting, prestigious, inviting, property-wide"
  },
};

const durationTiers = [
  { id: "quick", label: "Quick", range: [7, 15], desc: "7–15s" },
  { id: "short", label: "Short", range: [15, 30], desc: "15–30s" },
  { id: "standard", label: "Standard", range: [30, 45], desc: "30–45s" },
  { id: "long", label: "Long", range: [45, 60], desc: "45–60s" },
];

// Pick a random item from an array
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Pick a style from specific categories for a given outlet, respecting the smart engine
function pickStyleForShot(outletId, catIds, existing, temperature, moodId, beatKey) {
  const key = { tl: "t", wb: "w", nd: "n", bb: "b", pad: "p" }[outletId];
  const brandTarget = applyMood(brandTargets[outletId], moodId);
  const pool = [];
  for (const catId of catIds) {
    const cat = categories.find(c => c.id === catId);
    if (cat) pool.push(...S.filter(s => s[2].includes(key) && s[0] >= cat.range[0] && s[0] <= cat.range[1]));
  }
  if (pool.length === 0) return null;

  const safe = pool.filter(c => !existing.some(e => hasConflict(c, e)));
  if (safe.length === 0) return pool.length > 0 ? pick(pool) : null;

  const existingProfiles = existing.map(s => getStyleProfile(s));
  const scores = safe.map(s => {
    const prof = getStyleProfile(s);
    const brand = cosine(prof, brandTarget);
    let harmony = 1;
    if (existingProfiles.length > 0) harmony = cosine(prof, centroid(existingProfiles));
    const usage = getUsageBoost(s[0], { outlet: outletId, mood: moodId, beat: beatKey });
    return brand * 0.45 + harmony * 0.45 + usage * 0.1;
  });
  return weightedPick(safe, scores, temperature || 0.4);
}

function generateStoryboard(outletId, temp, tierId, moodId) {
  const structure = adStructures[outletId];
  if (!structure) return null;
  const tier = durationTiers.find(t => t.id === tierId) || durationTiers[1];
  const beats = structure.beatsByTier[tier.id] || structure.beatsByTier.short;

  const subject = pick(structure.subjects);
  const hook = pick(structure.hooks);
  const cta = pick(structure.ctas);
  const allPicked = [];

  // Calculate durations
  const [minDur, maxDur] = tier.range;
  const targetDur = minDur + Math.random() * (maxDur - minDur);
  const numBeats = beats.length;
  const rawDurs = beats.map(b => {
    const beat = shotBeats[b];
    const [lo, hi] = beat.durRange;
    return (lo + Math.random() * (hi - lo)) * structure.paceMultiplier;
  });
  const rawTotal = rawDurs.reduce((a, b) => a + b, 0);
  const scale = targetDur / rawTotal;
  const durations = rawDurs.map(d => Math.max(0.5, Math.round(d * scale * 10) / 10));

  // Build shots
  const shots = beats.map((beatKey, i) => {
    const beat = shotBeats[beatKey];
    const camera = pickStyleForShot(outletId, beat.catPri, allPicked, temp, moodId, beatKey);
    if (camera) allPicked.push(camera);
    const support = pickStyleForShot(outletId, beat.catSec, allPicked, temp, moodId, beatKey);
    if (support) allPicked.push(support);

    // Venue-aware shot descriptions
    const dish = getVenueDetail(outletId, "dishes");
    const drink = getVenueDetail(outletId, "drinks");
    const space = getVenueDetail(outletId, "spaces");
    const moment = getVenueDetail(outletId, "moments");
    const tex = getVenueDetail(outletId, "textures");
    const item = Math.random() > 0.5 ? dish : drink;

    let action = "";
    let intent = ""; // why this shot exists
    if (beatKey === "hook") {
      const hookActions = [
        [`Extreme close-up: ${tex}`, "Sensory-first — grabs attention before they can scroll"],
        [`${moment} — cut fast, feel first`, "Movement catches the eye in the first half-second"],
        [`Darkness. Then light hits ${item}`, "Contrast creates curiosity"],
        [`Quick burst: ${tex}, then smash to black`, "Rhythm disruption — forces a rewatch"],
      ];
      const h = pick(hookActions); action = h[0]; intent = h[1];
    } else if (beatKey === "reveal") {
      const revealActions = [
        [`Pull back from ${item} to reveal ${space}`, "Context grounds the viewer — now they know where they are"],
        [`Dolly through the entrance into ${space}`, "Spatial invitation — the viewer is walking in"],
        [`Camera rises from tabletop detail to the full room`, "Scale shift creates a sense of discovery"],
        [`${space} emerges through clearing steam / smoke`, "Mystery resolves into place — earned reveal"],
      ];
      const r = pick(revealActions); action = r[0]; intent = r[1];
    } else if (beatKey === "hero") {
      const heroActions = [
        [`${subject}: hero angle, ${space}. This is the money shot`, "The image they'll remember — needs to be perfect"],
        [`${item} arrives. Slow, intentional, perfectly lit`, "Desire. This is what you came for"],
        [`${subject} at its best — plated, poured, or presented`, "Aspirational framing — makes the viewer want to be here"],
        [`The moment of service: ${item} meets the table`, "Human + product = emotional connection"],
      ];
      const h = pick(heroActions); action = h[0]; intent = h[1];
    } else if (beatKey === "detail") {
      const detailActions = [
        [`Macro: ${tex}`, "Texture sells authenticity — this is real, not stock"],
        [`Hands on ${item} — the craft moment`, "Human touch = quality signal"],
        [`Tight on ${tex}. Hold it`, "Let the image breathe. Not every shot needs movement"],
        [`The detail nobody notices until you show them: ${tex}`, "Discovery shot — makes the viewer feel like an insider"],
      ];
      const d = pick(detailActions); action = d[0]; intent = d[1];
    } else if (beatKey === "energy") {
      const energyActions = [
        [`${moment}. Candid, not posed`, "Real energy sells better than staged energy"],
        [`The room in motion — ${moment}`, "Life proof. People are here and loving it"],
        [`Laughter, clinking, ${moment}`, "Sound-first shot — audio drives the edit here"],
        [`${moment} — catch it, don't direct it`, "Documentary instinct. Best moments are found, not made"],
      ];
      const e = pick(energyActions); action = e[0]; intent = e[1];
    } else if (beatKey === "space") {
      const spaceActions = [
        [`Wide: ${space}. Let the architecture do the work`, "Establishes scale and atmosphere"],
        [`Slow sweep across ${space}`, "The venue is a character — give it a proper entrance"],
        [`${space} — empty or full, this room tells a story`, "Environmental storytelling without words"],
        [`The light in ${space}. That's the shot`, "Mood > information in this beat"],
      ];
      const s = pick(spaceActions); action = s[0]; intent = s[1];
    } else if (beatKey === "closer") {
      const closerActions = [
        [`Logo lands over ${space}. "${cta}"`, "Brand recall — the last frame is the one they remember"],
        [`Final frame: ${space} glowing + logo fade-in`, "End on atmosphere, not a hard sell"],
        [`${moment} freezes. Logo. Done`, "Energy to stillness = punctuation"],
        [`End card: logo + "${cta}" over ${tex}`, "Texture background keeps it warm, not corporate"],
      ];
      const c = pick(closerActions); action = c[0]; intent = c[1];
    }

    const shotStyles = [camera, support].filter(Boolean);

    return {
      num: i + 1,
      beat: beat.role,
      duration: durations[i],
      action,
      intent,
      styles: shotStyles,
      gear: getGearForShot(beatKey, shotStyles),
    };
  });

  const totalDuration = durations.reduce((a, b) => a + b, 0);

  // Generate caption
  const captions = {
    tl: [
      `${hook} 🦎🍕🎸\n\n${cta}\n\n#TinLizard #ParADice #EastPeoria #LiveMusic #BarFood #DateNight #CentralIllinois`,
      `When the lights go down and the music comes up 🎶\n\n${cta}\n\n#TinLizardBarAndGrill #FridayNight #CraftCocktails #Wings #IL`,
    ],
    wb: [
      `${hook}\n\nWilliam B's Steakhouse at Par-A-Dice Hotel Casino.\n\n${cta}\n\n#WilliamBs #Steakhouse #FineDining #EastPeoria #DateNight #Steak`,
      `An evening well spent. 🥂\n\n${cta}\n\n#FoundedOnFlavor #ParADice #Steakhouse #PeoriaIL #SpecialOccasion`,
    ],
    nd: [
      `${hook} 🥪⚡\n\n${cta}\n\n#NelsonsDeli #ParADice #QuickBite #CasinoFood`,
      `Between hands. Between jackpots. Between amazing.\n\n${cta}\n\n#GrabAndGo #NelsonsDeli #ParADiceCasino`,
    ],
    bb: [
      `${hook} 🥃\n\nBourbon's at Par-A-Dice Hotel.\n\n${cta}\n\n#Bourbons #ParADice #HotelBar #CraftCocktails #NightOut #EastPeoria`,
      `The after-hours destination. 🥃✨\n\n${cta}\n\n#BourbonsLounge #ParADiceHotel #Nightcap #CocktailHour #CentralIL`,
    ],
    pad: [
      `${hook} 🎰✨\n\n${cta}\n\n#ParADice #EastPeoria #Casino #Hotel #Entertainment #BoydGaming #Illinois`,
      `Luck lives at 21 Blackjack Blvd. 🃏\n\n${cta}\n\n#ParADiceHotelCasino #Gaming #NightOut #BoydRewards #CentralIL`,
    ],
  };

  return {
    outlet: outletId,
    subject,
    hook,
    cta,
    caption: pick(captions[outletId] || captions.pad),
    totalDuration: Math.round(totalDuration * 10) / 10,
    shotCount: shots.length,
    shots,
    coherence: computeCoherence(shots.map(sh => sh.styles.map(s => ({ style: s, slot: "" }))).flat(), outletId),
  };
}

export default function App() {
  const [mode, setMode] = useState(null);
  const [path, setPath] = useState([]);
  const [genOutlet, setGenOutlet] = useState(null); // kept for saved recipes compatibility
  const [shotList, setShotList] = usePersistedState("pad-shotlist", []); // array of { style: [id,name,outlets], subject: "", why: "" }
  const [toast, setToast] = useState(null);
  const [temperature, setTemperature] = usePersistedState("pad-temp", 0.4); // 0-1
  const [savedRecipes, setSavedRecipes] = usePersistedState("pad-saved", []); // { name, outlet, recipe, coherence, timestamp }
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOutlet, setSearchOutlet] = useState(null); // null = all outlets
  const [storyboard, setStoryboard] = useState(null);
  const [sbOutlet, setSbOutlet] = useState(null);
  const [sbTier, setSbTier] = useState(null);
  const [sbMood, setSbMood] = useState(null);
  const [compareBoard, setCompareBoard] = useState(null);

  const selectedOutlet = path[0] ? outlets.find(o => o.id === path[0]) : null;
  const selectedCat = path[1] ? categories.find(c => c.id === path[1]) : null;

  const go = useCallback((level, id) => {
    setPath(prev => [...prev.slice(0, level), id]);
  }, []);

  const back = useCallback(() => {
    setPath(prev => prev.slice(0, -1));
  }, []);

  const goHome = useCallback(() => {
    setMode(null);
    setPath([]);
    setGenOutlet(null);
    setSbMood(null);
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  }, []);

  const addToShotList = useCallback((style) => {
    setShotList(prev => {
      if (prev.find(s => s.style[0] === style[0])) return prev;
      return [...prev, { style, subject: "", why: "" }];
    });
    recordStyleUsage([style[0]]);
    showToast(`+ #${style[0]} added`);
  }, [showToast]);

  const removeFromShotList = useCallback((styleId) => {
    setShotList(prev => prev.filter(s => s.style[0] !== styleId));
  }, []);

  const updateShotItem = useCallback((styleId, field, value) => {
    setShotList(prev => prev.map(s => s.style[0] === styleId ? { ...s, [field]: value } : s));
  }, []);



  const inList = useCallback((id) => shotList.some(s => s.style[0] === id), [shotList]);

  // Shared add button for style rows
  const AddBtn = ({ style }) => {
    const already = inList(style[0]);
    return (
      <button
        onClick={(e) => { e.stopPropagation(); if (!already) addToShotList(style); }}
        style={{
          background: already ? "#1A2A1A" : "#1A1A1A",
          border: `1px solid ${already ? "#2A4A2A" : "#333"}`,
          borderRadius: 6,
          color: already ? "#4A8A4A" : "#888",
          cursor: already ? "default" : "pointer",
          fontSize: 12,
          padding: "4px 10px",
          fontFamily: "inherit",
          flexShrink: 0,
          transition: "all 0.15s",
        }}
      >
        {already ? "✓" : "+"}
      </button>
    );
  };

  // Toast notification
  const Toast = () => toast ? (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: "#1A2A1A", border: "1px solid #2A4A2A", borderRadius: 8,
      padding: "10px 20px", fontSize: 13, color: "#6ABF6A", zIndex: 999,
      fontFamily: "'DM Sans', sans-serif",
      animation: "fadeUp 0.2s ease",
    }}>{toast}</div>
  ) : null;

  // HOME — four boxes
  if (mode === null) {
    return (
      <Shell title="Par-A-Dice Content System" crumbs={[]} onBack={null}>
        <div style={grid2}>
          <Box onClick={() => setMode("storyboard")}>
            <span style={{ fontSize: 32 }}>🎬</span>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>Generate</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Storyboard a full ad</div>
          </Box>
          <Box onClick={() => setMode("browse")}>
            <span style={{ fontSize: 32 }}>📂</span>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>Browse</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Explore 1,370 styles</div>
          </Box>
          <Box onClick={() => setMode("shotlist")}>
            <span style={{ fontSize: 32 }}>📋</span>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>Shot List</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
              {shotList.length === 0 ? "Empty" : `${shotList.length} style${shotList.length !== 1 ? "s" : ""}`}
            </div>
          </Box>
          <Box onClick={() => setMode("saved")}>
            <span style={{ fontSize: 32 }}>💾</span>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>Saved</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
              {savedRecipes.length === 0 ? "None yet" : `${savedRecipes.length} saved`}
            </div>
          </Box>
        </div>
        {/* Search bar on home */}
        <div style={{ marginTop: 24 }}>
          <input
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); if (e.target.value.length > 0) setMode("search"); }}
            placeholder="Search 1,370 styles..."
            style={{ ...inputStyle, width: "100%", padding: "12px 16px", fontSize: 14, borderRadius: 10, background: "#111", border: "1px solid #222" }}
          />
        </div>
        {/* Learning indicator */}
        {(() => { const p = getTasteProfile(); return p ? (
          <div style={{ marginTop: 12, textAlign: "center" }}>
            <span onClick={() => setMode("taste")} style={{ fontSize: 10, color: "#444", cursor: "pointer", textDecoration: "underline", textDecorationColor: "#222" }}>
              🧠 {p.totalSignals} signals · {p.uniqueStyles} styles learned · {p.daysSinceFirst}d of history
            </span>
          </div>
        ) : null; })()}
        <Toast />
      </Shell>
    );
  }

  // TASTE PROFILE VIEW
  if (mode === "taste") {
    const profile = getTasteProfile();
    const fileInputRef = useRef(null);
    return (
      <Shell title="Your Taste Profile" crumbs={[]} onBack={goHome} onHome={goHome}>
        {!profile ? (
          <div style={{ color: "#555", fontSize: 14, padding: "40px 0", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🧠</div>
            <div>No data yet. Generate storyboards and add styles to start learning.</div>
          </div>
        ) : (
          <>
            {/* Stats bar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
              {[
                [profile.totalSignals, "Signals"],
                [profile.uniqueStyles, "Unique Styles"],
                [`${profile.daysSinceFirst}d`, "History"],
              ].map(([val, label], i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 8, padding: "14px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
                  <div style={{ fontSize: 10, color: "#666", marginTop: 4, textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Top categories */}
            {profile.topCats.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Strongest Categories</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {profile.topCats.map((cat, i) => (
                    <div key={cat.id} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 6, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#333", fontFamily: "monospace", minWidth: 20 }}>{i + 1}</span>
                      <span style={{ fontSize: 13 }}>{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top styles */}
            {profile.topStyles.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Most-Picked Styles</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {profile.topStyles.map((s, i) => (
                    <div key={s[0]} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 6, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#333", fontFamily: "monospace", minWidth: 20 }}>{i + 1}</span>
                      <span style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>#{s[0]}</span>
                      <span style={{ fontSize: 13 }}>{s[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outlet preferences */}
            {Object.keys(profile.outletScores).length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Outlet Activity</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {Object.entries(profile.outletScores).sort((a, b) => b[1] - a[1]).map(([id, score]) => {
                    const ol = outlets.find(o => o.id === id);
                    return ol ? (
                      <div key={id} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 6, padding: "8px 14px", textAlign: "center" }}>
                        <div style={{ fontSize: 20 }}>{ol.icon}</div>
                        <div style={{ fontSize: 11, marginTop: 4 }}>{ol.name}</div>
                        <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{Math.round(score * 10) / 10}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Mood preferences */}
            {Object.keys(profile.moodScores).length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Mood Tendencies</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {Object.entries(profile.moodScores).sort((a, b) => b[1] - a[1]).map(([id, score]) => {
                    const m = moods.find(x => x.id === id);
                    return m ? (
                      <div key={id} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 6, padding: "8px 14px", textAlign: "center" }}>
                        <div style={{ fontSize: 20 }}>{m.icon}</div>
                        <div style={{ fontSize: 11, marginTop: 4 }}>{m.name}</div>
                        <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{Math.round(score * 10) / 10}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Export / Import */}
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #1A1A1A" }}>
              <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>Sync Across Devices</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => {
                  const json = exportLearningJSON();
                  const blob = new Blob([json], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a"); a.href = url; a.download = "pad-taste-profile.json"; a.click();
                  URL.revokeObjectURL(url);
                  showToast("Exported taste profile");
                }} style={generateBtn}>📤 Export</button>
                <button onClick={() => fileInputRef.current?.click()} style={generateBtn}>📥 Import</button>
                <input ref={fileInputRef} type="file" accept=".json" style={{ display: "none" }} onChange={e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const count = importLearningJSON(reader.result);
                    if (count >= 0) showToast(`Imported — ${count} total signals`);
                    else showToast("Invalid file");
                  };
                  reader.readAsText(file);
                  e.target.value = "";
                }} />
                <button onClick={() => {
                  if (confirm("Clear all learning data? This cannot be undone.")) {
                    saveLearningData({ signals: [], version: 2 });
                    showToast("Learning data cleared");
                  }
                }} style={{ ...generateBtn, color: "#AA5555", borderColor: "#442222" }}>🗑️ Reset</button>
              </div>
              <div style={{ fontSize: 10, color: "#333", marginTop: 8 }}>Export your profile, commit to the repo, import on another device. Merges automatically.</div>
            </div>
          </>
        )}
        <Toast />
      </Shell>
    );
  }

  // SEARCH MODE
  if (mode === "search") {
    const q = searchQuery.trim();
    const results = q.length > 0 ? S.map(s => {
      const score = fuzzyMatch(q, s[1]);
      // Also match category name
      const cat = categories.find(c => s[0] >= c.range[0] && s[0] <= c.range[1]);
      const catScore = cat ? fuzzyMatch(q, cat.name) * 0.5 : 0;
      const totalScore = Math.max(score, catScore);
      // Filter by outlet if selected
      if (searchOutlet) {
        const key = { tl: "t", wb: "w", nd: "n", bb: "b", pad: "p" }[searchOutlet];
        if (!s[2].includes(key)) return null;
      }
      return totalScore > 0 ? { style: s, score: totalScore } : null;
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 50) : [];

    return (
      <Shell title="Search" crumbs={[]} onBack={() => { setMode(null); setSearchQuery(""); setSearchOutlet(null); }} onHome={goHome}>
        <input
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); if (e.target.value.length === 0) setMode(null); }}
          placeholder="Search styles..."
          autoFocus
          style={{ ...inputStyle, width: "100%", padding: "12px 16px", fontSize: 14, borderRadius: 10, background: "#111", border: "1px solid #222", marginBottom: 12 }}
        />
        {/* Outlet filter chips */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
          <button onClick={() => setSearchOutlet(null)} style={{ ...generateBtn, fontSize: 11, padding: "4px 12px", background: !searchOutlet ? "#222" : "#1A1A1A", borderColor: !searchOutlet ? "#444" : "#333" }}>All</button>
          {outlets.map(o => (
            <button key={o.id} onClick={() => setSearchOutlet(searchOutlet === o.id ? null : o.id)} style={{ ...generateBtn, fontSize: 11, padding: "4px 12px", background: searchOutlet === o.id ? "#222" : "#1A1A1A", borderColor: searchOutlet === o.id ? "#444" : "#333" }}>
              {o.icon} {o.name}
            </button>
          ))}
        </div>
        {q.length > 0 && <div style={{ fontSize: 12, color: "#555", marginBottom: 12 }}>{results.length} result{results.length !== 1 ? "s" : ""}</div>}
        <div style={grid3}>
          {results.map(({ style: s }) => {
            const cat = categories.find(c => s[0] >= c.range[0] && s[0] <= c.range[1]);
            const outletIcons = s[2].split("").map(k => { const o = outlets.find(x => x.id === outletKey[k]); return o?.icon; }).filter(Boolean);
            return (
              <div key={s[0]} style={{ background: inList(s[0]) ? "#111814" : "#111", border: `1px solid ${inList(s[0]) ? "#1E2E1E" : "#1E1E1E"}`, borderRadius: 8, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>#{s[0]}</span>
                    {cat && <span style={{ fontSize: 9, color: "#444" }}>{cat.name}</span>}
                  </div>
                  <AddBtn style={s} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{s[1]}</div>
                {outletIcons.length > 0 && <div style={{ display: "flex", gap: 3 }}>{outletIcons.map((icon, j) => <span key={j} style={{ fontSize: 11 }}>{icon}</span>)}</div>}
              </div>
            );
          })}
        </div>
        <Toast />
      </Shell>
    );
  }

  // SAVED RECIPES VIEW
  if (mode === "saved") {
    return (
      <Shell title="Saved Combos" crumbs={[]} onBack={goHome} onHome={goHome}>
        {savedRecipes.length === 0 ? (
          <div style={{ color: "#555", fontSize: 14, padding: "40px 0", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>💾</div>
            <div>No saved recipes yet.</div>
            <div style={{ marginTop: 4, fontSize: 12 }}>Generate a recipe and save it.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {savedRecipes.map((sr, i) => {
              const ol = outlets.find(o => o.id === sr.outlet);
              return (
                <div key={i} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{sr.name}</div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{ol?.icon} {ol?.name} · {sr.recipe.length} styles · {Math.round(sr.coherence * 100)}% coherence</div>
                    </div>
                    <button onClick={() => setSavedRecipes(prev => prev.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#553333", cursor: "pointer", fontSize: 14 }}>✕</button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                    {sr.recipe.map(item => (
                      <span key={item.style[0]} style={{ fontSize: 11, background: "#1A1A1A", border: "1px solid #252525", borderRadius: 6, padding: "4px 8px", color: "#AAA" }}>
                        <span style={{ color: "#555" }}>{item.slot}:</span> {item.style[1]}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <button onClick={() => {
                      sr.recipe.forEach(item => {
                        if (!shotList.find(s => s.style[0] === item.style[0])) {
                          setShotList(prev => [...prev, { style: item.style, subject: "", why: "" }]);
                        }
                      });
                      showToast(`Added ${sr.recipe.length} to shot list`);
                    }} style={generateBtn}>📋 Add to Shot List</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Toast />
      </Shell>
    );
  }

  // SHOT LIST VIEW
  if (mode === "shotlist") {
    return (
      <Shell title="Shot List" crumbs={[]} onBack={goHome} onHome={goHome}>
        {shotList.length === 0 ? (
          <div style={{ color: "#555", fontSize: 14, padding: "40px 0", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
            <div>No styles yet.</div>
            <div style={{ marginTop: 4, fontSize: 12 }}>Use Browse or Generate to add styles.</div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#888" }}>{shotList.length} style{shotList.length !== 1 ? "s" : ""}</span>
              <button onClick={() => {
                const text = shotList.map(s => {
                  let line = `#${s.style[0]} — ${s.style[1]}`;
                  if (s.subject) line += ` [${s.subject}]`;
                  if (s.why) line += ` → ${s.why}`;
                  return line;
                }).join("\n");
                navigator.clipboard?.writeText(text);
                showToast("Copied to clipboard");
              }} style={generateBtn}>
                Copy
              </button>
              <button onClick={() => setShotList([])} style={{ ...generateBtn, color: "#AA5555", borderColor: "#442222" }}>
                Clear
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {shotList.map((item) => {
                const s = item.style;
                const cat = categories.find(c => s[0] >= c.range[0] && s[0] <= c.range[1]);
                const outletIcons = s[2].split("").map(k => {
                  const o = outlets.find(x => x.id === outletKey[k]);
                  return o?.icon;
                }).filter(Boolean);
                return (
                  <div key={s[0]} style={{
                    background: "#111",
                    border: "1px solid #1E1E1E",
                    borderRadius: 8,
                    padding: "14px 16px",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>#{s[0]}</span>
                          {cat && <span style={{ fontSize: 10, color: "#444" }}>{cat.name}</span>}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4, lineHeight: 1.4 }}>{s[1]}</div>
                        {outletIcons.length > 0 && (
                          <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                            {outletIcons.map((icon, j) => <span key={j} style={{ fontSize: 11 }}>{icon}</span>)}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromShotList(s[0])}
                        style={{ background: "none", border: "1px solid #2A1A1A", borderRadius: 6, color: "#774444", cursor: "pointer", fontSize: 12, padding: "4px 10px", fontFamily: "inherit", flexShrink: 0 }}
                      >✕</button>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                      <input
                        value={item.subject}
                        onChange={e => updateShotItem(s[0], "subject", e.target.value)}
                        placeholder="Subject (pizza, old fashioned...)"
                        style={inputStyle}
                      />
                      <input
                        value={item.why}
                        onChange={e => updateShotItem(s[0], "why", e.target.value)}
                        placeholder="Why? (the neon sign behind the bar...)"
                        style={{ ...inputStyle, flex: 2 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <Toast />
      </Shell>
    );
  }

  // STORYBOARD MODE — pick outlet
  if (mode === "storyboard" && !sbOutlet) {
    return (
      <Shell title="Storyboard — Pick an Outlet" crumbs={[]} onBack={goHome} onHome={goHome}>
        <div style={grid2}>
          {outlets.map(o => (
            <Box key={o.id} onClick={() => setSbOutlet(o.id)}>
              <span style={{ fontSize: 32 }}>{o.icon}</span>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>{o.name}</div>
              <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{o.sub}</div>
            </Box>
          ))}
        </div>
        <Toast />
      </Shell>
    );
  }

  // STORYBOARD MODE — pick mood
  if (mode === "storyboard" && sbOutlet && !sbMood) {
    const ol = outlets.find(o => o.id === sbOutlet);
    return (
      <Shell title={`${ol.icon} ${ol.name} — Set the Mood`} crumbs={[]} onBack={() => setSbOutlet(null)} onHome={goHome}>
        <div style={grid2}>
          {moods.map(m => (
            <Box key={m.id} onClick={() => setSbMood(m.id)}>
              <span style={{ fontSize: 28 }}>{m.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{m.desc}</div>
            </Box>
          ))}
        </div>
        <Toast />
      </Shell>
    );
  }

  // STORYBOARD MODE — pick duration
  if (mode === "storyboard" && sbOutlet && sbMood && !sbTier) {
    const ol = outlets.find(o => o.id === sbOutlet);
    const moodObj = moods.find(m => m.id === sbMood);
    return (
      <Shell title={`${ol.icon} ${ol.name} — ${moodObj?.icon} ${moodObj?.name}`} crumbs={[]} onBack={() => setSbMood(null)} onHome={goHome}>
        <div style={{ fontSize: 12, color: "#555", marginBottom: 16 }}>Pick a length</div>
        <div style={grid2}>
          {durationTiers.map(t => {
            const beats = adStructures[sbOutlet].beatsByTier[t.id];
            return (
              <Box key={t.id} onClick={() => { setSbTier(t.id); setStoryboard(generateStoryboard(sbOutlet, temperature, t.id, sbMood)); }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{t.desc}</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{t.label}</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 6 }}>{beats.length} shots</div>
              </Box>
            );
          })}
        </div>
        <Toast />
      </Shell>
    );
  }

  // STORYBOARD MODE — display
  if (mode === "storyboard" && sbOutlet && sbTier && storyboard) {
    const ol = outlets.find(o => o.id === sbOutlet);
    const tier = durationTiers.find(t => t.id === sbTier);
    return (
      <Shell title={`${ol.icon} ${ol.name} — ${tier.label} Ad`} crumbs={[]} onBack={() => { setSbTier(null); setStoryboard(null); }} onHome={goHome}>
        {/* Header: subject + duration + mood */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>"{storyboard.hook}"</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
            Subject: <span style={{ color: "#AAA" }}>{storyboard.subject}</span> · {storyboard.totalDuration}s · {storyboard.shotCount} shots
            {sbMood && (() => { const m = moods.find(x => x.id === sbMood); return m ? <span> · {m.icon} {m.name}</span> : null; })()}
          </div>
        </div>

        {/* Temperature */}
        <div style={{ marginBottom: 16, background: "#111", borderRadius: 8, padding: "10px 14px", border: "1px solid #1E1E1E" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "1px" }}>Creativity</span>
            <span style={{ fontSize: 11, color: "#AAA" }}>{tempLabels[Math.min(4, Math.floor(temperature * 5))]}</span>
          </div>
          <input type="range" min="0" max="1" step="0.05" value={temperature} onChange={e => setTemperature(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#888" }} />
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <button onClick={() => setStoryboard(generateStoryboard(sbOutlet, temperature, sbTier, sbMood))} style={generateBtn}>🎲 Reroll</button>
          <button onClick={() => {
            storyboard.shots.forEach(sh => {
              sh.styles.forEach(s => {
                if (!shotList.find(item => item.style[0] === s[0])) {
                  setShotList(prev => [...prev, { style: s, subject: storyboard.subject, why: `Shot ${sh.num}: ${sh.beat}` }]);
                }
              });
            });
            // Record usage for learning with context
            storyboard.shots.forEach(sh => {
              sh.styles.forEach(s => {
                recordStyleUsage([s[0]], { outlet: sbOutlet, mood: sbMood, beat: sh.beat.toLowerCase() });
              });
            });
            showToast(`Added ${storyboard.shots.reduce((a, sh) => a + sh.styles.length, 0)} styles to shot list`);
          }} style={generateBtn}>📋 → Shot List</button>
          <button onClick={() => {
            let text = `🎬 ${ol.name} AD STORYBOARD\n`;
            text += `Hook: "${storyboard.hook}"\n`;
            text += `Subject: ${storyboard.subject} · ${storyboard.totalDuration}s\n\n`;
            storyboard.shots.forEach(sh => {
              text += `SHOT ${sh.num} — ${sh.beat} (${sh.duration}s)\n`;
              text += `  ${sh.action}\n`;
              if (sh.intent) text += `  Why: ${sh.intent}\n`;
              text += `  Styles: ${sh.styles.map(s => `#${s[0]} ${s[1]}`).join(", ")}\n`;
              if (sh.gear?.length) text += `  Gear: ${sh.gear.map(g => g.name).join(", ")}\n`;
              text += `\n`;
            });
            text += `CTA: ${storyboard.cta}\n\n`;
            text += `CAPTION:\n${storyboard.caption}`;
            navigator.clipboard?.writeText(text);
            showToast("Copied storyboard");
          }} style={generateBtn}>📄 Copy</button>
          <button onClick={() => setMode("treatment")} style={generateBtn}>📑 Treatment</button>
          <button onClick={() => {
            const sb2 = generateStoryboard(sbOutlet, temperature, sbTier, sbMood);
            setCompareBoard(sb2);
            setMode("compare");
          }} style={generateBtn}>⚖️ Compare</button>
        </div>

        {/* Visual timeline */}
        <div style={{ marginBottom: 20, background: "#111", border: "1px solid #1E1E1E", borderRadius: 8, padding: "14px 16px", overflowX: "auto" }}>
          <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>Timeline</div>
          <div style={{ display: "flex", gap: 2, minWidth: "100%", height: 48 }}>
            {storyboard.shots.map((sh) => {
              const pct = (sh.duration / storyboard.totalDuration) * 100;
              const beatColors = { HOOK: "#BF6A4A", REVEAL: "#6A8FBF", HERO: "#BFA64A", DETAIL: "#8A7ABF", ENERGY: "#6ABF6A", SPACE: "#4A9EBF", CLOSER: "#AAA" };
              const color = beatColors[sh.beat] || "#555";
              return (
                <div key={sh.num} style={{ width: `${pct}%`, minWidth: 24, background: `${color}15`, border: `1px solid ${color}40`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, transition: "all 0.2s" }}
                  title={`Shot ${sh.num}: ${sh.beat} — ${sh.duration}s`}
                >
                  <span style={{ fontSize: 9, color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>{sh.beat.slice(0, 3)}</span>
                  <span style={{ fontSize: 8, color: "#555", fontFamily: "monospace" }}>{sh.duration}s</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 9, color: "#444", fontFamily: "monospace" }}>0s</span>
            <span style={{ fontSize: 9, color: "#444", fontFamily: "monospace" }}>{storyboard.totalDuration}s</span>
          </div>
        </div>

        {/* Shot sequence */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {storyboard.shots.map((sh) => (
            <div key={sh.num} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#333", fontFamily: "monospace" }}>{sh.num}</span>
                  <span style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "1px", background: "#1A1A1A", padding: "2px 8px", borderRadius: 4 }}>{sh.beat}</span>
                </div>
                <span style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>{sh.duration}s</span>
              </div>
              <div style={{ fontSize: 13, color: "#CCC", lineHeight: 1.5, marginBottom: 4 }}>{sh.action}</div>
              {sh.intent && <div style={{ fontSize: 11, color: "#555", fontStyle: "italic", marginBottom: 8, lineHeight: 1.4 }}>↳ {sh.intent}</div>}
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {sh.styles.map(s => (
                  <span key={s[0]} style={{ fontSize: 10, color: "#777", background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: 4, padding: "2px 6px" }}>
                    #{s[0]} {s[1]}
                  </span>
                ))}
              </div>
              {/* Equipment */}
              {sh.gear && sh.gear.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #1A1A1A" }}>
                  <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>Gear</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {sh.gear.map(g => {
                      const catIcons = { camera: "📷", lens: "🔭", motion: "🎚️", lighting: "💡", audio: "🎙️", support: "🔩" };
                      return (
                        <span key={g.id} title={g.desc} style={{ fontSize: 10, color: "#666", background: "#0A0A0A", border: "1px solid #181818", borderRadius: 4, padding: "2px 6px" }}>
                          {catIcons[g.cat] || "⚙️"} {g.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 16, background: "#111", border: "1px solid #1E1E1E", borderRadius: 8, padding: "14px 16px" }}>
          <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Call to Action</div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{storyboard.cta}</div>
        </div>

        {/* Caption */}
        <div style={{ marginTop: 8, background: "#111", border: "1px solid #1E1E1E", borderRadius: 8, padding: "14px 16px" }}>
          <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Caption</div>
          <div style={{ fontSize: 13, color: "#AAA", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{storyboard.caption}</div>
        </div>

        <Toast />
      </Shell>
    );
  }

  // TREATMENT EXPORT VIEW — clean, print-ready
  if (mode === "treatment" && storyboard && sbOutlet) {
    const ol = outlets.find(o => o.id === sbOutlet);
    const tier = durationTiers.find(t => t.id === sbTier);
    const mood = moods.find(m => m.id === sbMood);
    const beatColors = { HOOK: "#BF6A4A", REVEAL: "#6A8FBF", HERO: "#BFA64A", DETAIL: "#8A7ABF", ENERGY: "#6ABF6A", SPACE: "#4A9EBF", CLOSER: "#AAA" };
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0A0A0A", color: "#E0E0E0", minHeight: "100vh", padding: "0" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`@media print { body { background: #0A0A0A !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } }`}</style>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid #1A1A1A" }}>
          <button onClick={() => setMode("storyboard")} style={{ ...backBtn, padding: 0, margin: 0 }}>← Back</button>
          <button onClick={() => window.print()} style={generateBtn}>🖨️ Print</button>
        </div>
        {/* Title card */}
        <div style={{ padding: "40px 32px 24px", borderBottom: "1px solid #1A1A1A" }}>
          <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 8 }}>CONTENT TREATMENT — {ol.name}</div>
          <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>"{storyboard.hook}"</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: "#888" }}>
            <span>{ol.icon} {ol.name}</span>
            <span>·</span>
            <span>Subject: {storyboard.subject}</span>
            <span>·</span>
            <span>{storyboard.totalDuration}s / {storyboard.shotCount} shots</span>
            {mood && <><span>·</span><span>{mood.icon} {mood.name}</span></>}
          </div>
          <div style={{ fontSize: 10, color: "#333", marginTop: 16 }}>JSDetail LLC · Par-A-Dice Hotel Casino · Spec Treatment</div>
        </div>
        {/* Timeline strip */}
        <div style={{ padding: "16px 32px", borderBottom: "1px solid #1A1A1A" }}>
          <div style={{ display: "flex", gap: 2, height: 32 }}>
            {storyboard.shots.map(sh => {
              const pct = (sh.duration / storyboard.totalDuration) * 100;
              const c = beatColors[sh.beat] || "#555";
              return (<div key={sh.num} style={{ width: `${pct}%`, minWidth: 20, background: `${c}20`, border: `1px solid ${c}50`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 8, color: c, fontWeight: 700 }}>{sh.num}</span>
              </div>);
            })}
          </div>
        </div>
        {/* Shot cards */}
        <div style={{ padding: "24px 32px" }}>
          {storyboard.shots.map(sh => {
            const c = beatColors[sh.beat] || "#555";
            return (
              <div key={sh.num} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #151515" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: "#222", fontFamily: "monospace" }}>{String(sh.num).padStart(2, "0")}</span>
                  <span style={{ fontSize: 10, color: c, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>{sh.beat}</span>
                  <span style={{ fontSize: 11, color: "#444", fontFamily: "monospace", marginLeft: "auto" }}>{sh.duration}s</span>
                </div>
                <div style={{ fontSize: 14, color: "#CCC", lineHeight: 1.6, marginBottom: 6 }}>{sh.action}</div>
                {sh.intent && <div style={{ fontSize: 12, color: "#666", fontStyle: "italic", marginBottom: 6 }}>↳ {sh.intent}</div>}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 4 }}>
                  {sh.styles.map(s => (<span key={s[0]} style={{ fontSize: 9, color: "#555", background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: 3, padding: "2px 6px" }}>#{s[0]} {s[1]}</span>))}
                </div>
                {sh.gear?.length > 0 && <div style={{ fontSize: 10, color: "#444", marginTop: 4 }}>🎬 {sh.gear.map(g => g.name).join(" · ")}</div>}
              </div>
            );
          })}
        </div>
        {/* CTA + Caption */}
        <div style={{ padding: "0 32px 24px", borderTop: "1px solid #1A1A1A", paddingTop: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Call to Action</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{storyboard.cta}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Platform Caption</div>
              <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{storyboard.caption}</div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div style={{ padding: "16px 32px", borderTop: "1px solid #1A1A1A", fontSize: 9, color: "#333", textAlign: "center" }}>
          Spec portfolio project by JSDetail LLC. Not affiliated with Par-A-Dice Hotel Casino or Boyd Gaming.
        </div>
      </div>
    );
  }

  // COMPARE VIEW — two storyboards side by side
  if (mode === "compare" && storyboard && compareBoard && sbOutlet) {
    const ol = outlets.find(o => o.id === sbOutlet);
    const beatColors = { HOOK: "#BF6A4A", REVEAL: "#6A8FBF", HERO: "#BFA64A", DETAIL: "#8A7ABF", ENERGY: "#6ABF6A", SPACE: "#4A9EBF", CLOSER: "#AAA" };
    const renderMiniBoard = (sb, label, accent) => (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontSize: 10, color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>"{sb.hook}"</div>
        <div style={{ fontSize: 11, color: "#666", marginBottom: 12 }}>{sb.subject} · {sb.totalDuration}s · {sb.shotCount} shots</div>
        {/* Mini timeline */}
        <div style={{ display: "flex", gap: 1, height: 24, marginBottom: 12 }}>
          {sb.shots.map(sh => {
            const pct = (sh.duration / sb.totalDuration) * 100;
            const c = beatColors[sh.beat] || "#555";
            return (<div key={sh.num} style={{ width: `${pct}%`, minWidth: 14, background: `${c}20`, border: `1px solid ${c}40`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 7, color: c, fontWeight: 700 }}>{sh.num}</span>
            </div>);
          })}
        </div>
        {/* Shot list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {sb.shots.map(sh => {
            const c = beatColors[sh.beat] || "#555";
            return (
              <div key={sh.num} style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 6, padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#333", fontFamily: "monospace" }}>{sh.num}</span>
                  <span style={{ fontSize: 8, color: c, textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{sh.beat}</span>
                  <span style={{ fontSize: 9, color: "#444", fontFamily: "monospace", marginLeft: "auto" }}>{sh.duration}s</span>
                </div>
                <div style={{ fontSize: 11, color: "#BBB", lineHeight: 1.4 }}>{sh.action}</div>
                <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginTop: 4 }}>
                  {sh.styles.map(s => (<span key={s[0]} style={{ fontSize: 8, color: "#555", background: "#0D0D0D", borderRadius: 2, padding: "1px 4px" }}>#{s[0]}</span>))}
                </div>
              </div>
            );
          })}
        </div>
        {/* CTA */}
        <div style={{ marginTop: 10, fontSize: 12, color: "#888" }}>{sb.cta}</div>
      </div>
    );
    return (
      <Shell title={`${ol.icon} ${ol.name} — Compare Treatments`} crumbs={[]} onBack={() => { setCompareBoard(null); setMode("storyboard"); }} onHome={goHome}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <button onClick={() => setCompareBoard(generateStoryboard(sbOutlet, temperature, sbTier, sbMood))} style={generateBtn}>🎲 Reroll B</button>
          <button onClick={() => { setStoryboard(generateStoryboard(sbOutlet, temperature, sbTier, sbMood)); setCompareBoard(generateStoryboard(sbOutlet, temperature, sbTier, sbMood)); }} style={generateBtn}>🎲 Reroll Both</button>
          <button onClick={() => {
            let text = `⚖️ COMPARE: ${ol.name}\n\n`;
            [["A", storyboard], ["B", compareBoard]].forEach(([label, sb]) => {
              text += `— TREATMENT ${label} —\nHook: "${sb.hook}"\nSubject: ${sb.subject} · ${sb.totalDuration}s\n`;
              sb.shots.forEach(sh => { text += `  ${sh.num}. ${sh.beat} (${sh.duration}s) — ${sh.action}\n`; });
              text += `CTA: ${sb.cta}\n\n`;
            });
            navigator.clipboard?.writeText(text);
            showToast("Copied comparison");
          }} style={generateBtn}>📄 Copy Both</button>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {renderMiniBoard(storyboard, "Treatment A", "#6A8FBF")}
          {renderMiniBoard(compareBoard, "Treatment B", "#BFA64A")}
        </div>
        {/* Pick winner */}
        <div style={{ marginTop: 20, padding: "16px 0", borderTop: "1px solid #1A1A1A" }}>
          <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10, textAlign: "center" }}>Pick the winner — the system learns your preference</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={() => {
              // Winner: double-weight positive with context
              storyboard.shots.forEach(sh => sh.styles.forEach(s => {
                recordStyleUsage([s[0]], { outlet: sbOutlet, mood: sbMood, beat: sh.beat.toLowerCase(), weight: 2 });
              }));
              // Loser: penalty
              compareBoard.shots.forEach(sh => sh.styles.forEach(s => {
                recordStylePenalty([s[0]], { outlet: sbOutlet, mood: sbMood, beat: sh.beat.toLowerCase() });
              }));
              setCompareBoard(null); setMode("storyboard");
              showToast("✓ Treatment A wins — preferences updated");
            }} style={{ ...generateBtn, color: "#6A8FBF", borderColor: "#2A3A5A" }}>🏆 A wins</button>
            <button onClick={() => {
              compareBoard.shots.forEach(sh => sh.styles.forEach(s => {
                recordStyleUsage([s[0]], { outlet: sbOutlet, mood: sbMood, beat: sh.beat.toLowerCase(), weight: 2 });
              }));
              storyboard.shots.forEach(sh => sh.styles.forEach(s => {
                recordStylePenalty([s[0]], { outlet: sbOutlet, mood: sbMood, beat: sh.beat.toLowerCase() });
              }));
              setStoryboard(compareBoard); setCompareBoard(null); setMode("storyboard");
              showToast("✓ Treatment B wins — preferences updated");
            }} style={{ ...generateBtn, color: "#BFA64A", borderColor: "#5A4A1A" }}>🏆 B wins</button>
          </div>
        </div>
        <Toast />
      </Shell>
    );
  }

  // BROWSE MODE — Level 0: Outlets
  if (mode === "browse" && path.length === 0) {
    return (
      <Shell title="Browse — Select an Outlet" crumbs={[]} onBack={goHome} onHome={goHome}>
        <div style={grid2}>
          {outlets.map(o => {
            const count = getStylesForOutlet(o.id).length;
            return (
              <Box key={o.id} onClick={() => go(0, o.id)}>
                <span style={{ fontSize: 32 }}>{o.icon}</span>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>{o.name}</div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{o.sub}</div>
                <div style={countBadge}>{count} styles</div>
              </Box>
            );
          })}
        </div>
        <Toast />
      </Shell>
    );
  }

  // Breadcrumbs for browse
  const crumbs = [];
  if (selectedOutlet) crumbs.push({ label: selectedOutlet.name, action: () => setPath([path[0]]) });
  if (selectedCat) crumbs.push({ label: selectedCat.name, action: () => {} });

  // BROWSE — Level 1: Categories
  if (mode === "browse" && path.length === 1) {
    const catsWithCounts = categories.map(c => ({
      ...c,
      count: getStylesForOutletAndCategory(path[0], c).length,
    })).filter(c => c.count > 0);

    return (
      <Shell title={`${selectedOutlet.icon} ${selectedOutlet.name}`} crumbs={crumbs} onBack={back} onHome={goHome}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
          {getStylesForOutlet(path[0]).length} total styles across {catsWithCounts.length} categories
        </div>
        <div style={grid2}>
          {catsWithCounts.map(c => (
            <Box key={c.id} onClick={() => go(1, c.id)} small>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
              <div style={countBadge}>{c.count}</div>
            </Box>
          ))}
        </div>
        <Toast />
      </Shell>
    );
  }

  // BROWSE — Level 2: Styles
  if (mode === "browse" && path.length === 2) {
    const styles = getStylesForOutletAndCategory(path[0], selectedCat);
    return (
      <Shell title={selectedCat.name} crumbs={crumbs} onBack={back} onHome={goHome}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
          {styles.length} styles for {selectedOutlet.name}
        </div>
        <div style={grid3}>
          {styles.map(s => {
            const otherOutlets = s[2].split("").map(k => outletKey[k]).filter(o => o !== path[0]);
            return (
              <div key={s[0]} style={{
                background: inList(s[0]) ? "#111814" : "#111",
                border: `1px solid ${inList(s[0]) ? "#1E2E1E" : "#1E1E1E"}`,
                borderRadius: 8,
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>#{s[0]}</div>
                  <AddBtn style={s} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{s[1]}</div>
                {otherOutlets.length > 0 && (
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {otherOutlets.map(o => {
                      const ol = outlets.find(x => x.id === o);
                      return <span key={o} style={tagStyle}>{ol?.icon}</span>;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Toast />
      </Shell>
    );
  }

  return null;
}

function Shell({ title, crumbs, onBack, onHome, children }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0A0A0A", color: "#E0E0E0", minHeight: "100vh", padding: "20px 24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }`}</style>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {onBack && (
          <button onClick={onBack} style={backBtn}>← Back</button>
        )}
        {onHome && (
          <button onClick={onHome} style={backBtn}>⌂ Home</button>
        )}
      </div>
      {crumbs.length > 0 && (
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
          <span onClick={() => crumbs[0]?.action()} style={{ fontSize: 12, color: "#666", cursor: crumbs.length > 1 ? "pointer" : "default", textDecoration: crumbs.length > 1 ? "underline" : "none" }}>
            {crumbs[0]?.label}
          </span>
          {crumbs[1] && <>
            <span style={{ fontSize: 12, color: "#444" }}>/</span>
            <span style={{ fontSize: 12, color: "#888" }}>{crumbs[1]?.label}</span>
          </>}
        </div>
      )}
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.3px" }}>{title}</h1>
      {children}
      <div style={{ marginTop: 48, paddingTop: 16, borderTop: "1px solid #1A1A1A", fontSize: 10, color: "#333", lineHeight: 1.5, textAlign: "center" }}>
        Spec portfolio project. Not affiliated with Par-A-Dice Hotel Casino or Boyd Gaming.
      </div>
    </div>
  );
}

function Box({ children, onClick, small }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#141414",
        border: "1px solid #222",
        borderRadius: 10,
        padding: small ? "16px 18px" : "24px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: small ? "flex-start" : "center",
        textAlign: small ? "left" : "center",
        transition: "border-color 0.15s, background 0.15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.background = "#1A1A1A"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.background = "#141414"; }}
    >
      {children}
    </div>
  );
}


const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 };
const grid3 = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 };
const countBadge = { fontSize: 11, color: "#666", marginTop: 8, fontFamily: "monospace" };
const backBtn = { background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 13, padding: "0 0 8px", fontFamily: "inherit" };
const tagStyle = { fontSize: 12, background: "#1A1A1A", borderRadius: 4, padding: "2px 5px" };
const generateBtn = { background: "#1A1A1A", border: "1px solid #333", borderRadius: 8, color: "#E0E0E0", cursor: "pointer", fontSize: 13, fontWeight: 500, padding: "8px 16px", fontFamily: "inherit", transition: "all 0.15s" };
const inputStyle = { background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: 6, color: "#CCC", fontSize: 12, padding: "6px 10px", fontFamily: "inherit", flex: 1, outline: "none", minWidth: 120 };
