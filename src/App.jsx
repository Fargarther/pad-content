import { useState, useCallback } from "react";

const outlets = [
  { id: "tl", name: "Tin Lizard", sub: "Bar & Grill", icon: "🦎" },
  { id: "wb", name: "William B's", sub: "Steakhouse", icon: "🥩" },
  { id: "nd", name: "Nelson's Deli", sub: "Quick Service", icon: "🥪" },
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
];

// Compact data: [id, name, outlets_string] where outlets_string uses t=TL w=WB n=ND p=PAD
const S = [
[1,"White chalk street lettering on dark pavement","tn"],
[2,"Neon tube script traced over footage","tp"],
[3,"Cursive ink bleed reveal","w"],
[4,"Condensation finger-writing on cold glass","t"],
[5,"Salt pour lettering on dark bar top","t"],
[6,"Gold leaf press-on lettering","wp"],
[7,"Typewriter key strike animation","wp"],
[8,"Flour dust lettering on cutting board","tn"],
[9,"Smoke lettering dissipating into air","twp"],
[10,"Grease pencil scrawl on butcher paper","tn"],
[11,"Frost crystal forming into words on glass","w"],
[12,"Matchstick burn lettering into wood","tw"],
[13,"Ketchup squeeze-bottle script on white plate","tn"],
[14,"Branded iron burn into wood plank","twp"],
[15,"Stencil spray paint on concrete","t"],
[16,"Cocktail napkin ballpoint pen handwriting","t"],
[17,"Embossed leather stamp lettering","wp"],
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
[151,"Single candle illumination","w"],
[152,"Neon wash colored neon fills scene","tp"],
[153,"Rim light silhouette","twp"],
[154,"Chiaroscuro high contrast","wp"],
[155,"Blacklight UV glow","tp"],
[156,"Spotlight isolation","twp"],
[157,"Backlit steam/smoke","tw"],
[158,"Golden hour window light","wnp"],
[159,"Practical lights only venue fixtures","twnp"],
[160,"Edison bulb warm glow","tw"],
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
[438,"Day-in-the-life of a bartender","tw"],
[439,"Day-in-the-life of a server","twn"],
[440,"One dish three ways","tw"],
[441,"Regular's order","twn"],
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
[455,"Nostalgia callback vintage to modern","p"],
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
[501,"Neon noir crushed blacks neon accents","tp"],
[502,"Warm golden amber","tw"],
[503,"High-key bright and airy","n"],
[504,"Desaturated matte editorial","wp"],
[505,"Teal and orange blockbuster","tp"],
[506,"Monochromatic single-hue wash","wp"],
[507,"Sepia vintage tone","p"],
[508,"Cross-processed film unexpected shifts","t"],
[509,"Bleach bypass reduced sat high contrast","twp"],
[510,"Day-for-night grade","p"],
[511,"Kodak Portra emulation","tw"],
[512,"Fuji Velvia emulation punchy saturation","tp"],
[513,"Cinestill 800T tungsten halation","tp"],
[514,"Technicolor two-strip",""],
[515,"Black and white high contrast","twp"],
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
[575,"Reverse audio swell","twp"],
[576,"Multi-layered sound design","twp"],
[577,"Call-and-response audio edit","t"],
[578,"Tempo-matched camera movement","twp"],
[579,"Frequency-reactive graphics","tp"],
[580,"Audio-reactive color shift","tp"],
[581,"Binaural audio panning","twp"],
[582,"Voiceover narration overlay","twnp"],
[583,"Whispered narration ASMR","w"],
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
];

const outletKey = { t: "tl", w: "wb", n: "nd", p: "pad" };

function getStylesForOutlet(outletId) {
  const key = { tl: "t", wb: "w", nd: "n", pad: "p" }[outletId];
  return S.filter(s => s[2].includes(key));
}

function getStylesForOutletAndCategory(outletId, cat) {
  const key = { tl: "t", wb: "w", nd: "n", pad: "p" }[outletId];
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
  // Clamp 0-1
  return base.map(v => Math.max(0, Math.min(1, v)));
}

// Brand target profiles: [pace, energy, warmth, sophistication, playfulness]
const brandTargets = {
  tl:  [0.65, 0.75, 0.7, 0.25, 0.8],  // fast, loud, warm, casual, fun
  wb:  [0.2, 0.25, 0.75, 0.9, 0.15],   // slow, quiet, warm, refined, serious
  nd:  [0.85, 0.6, 0.5, 0.1, 0.6],     // very fast, moderate energy, neutral, casual
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
  const key = { tl: "t", wb: "w", nd: "n", pad: "p" }[outletId];
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

// === STORYBOARD ENGINE ===

// Shot beats define the narrative arc of an ad
// Each beat type has: role, typical duration range, which style categories to pull from
const shotBeats = {
  hook:    { role: "HOOK",    durRange: [1, 2],  catPri: [7, 12], catSec: [3, 4],      desc: "Thumb-stopper. Extreme detail, dramatic action." },
  reveal:  { role: "REVEAL",  durRange: [2, 3],  catPri: [2, 3],  catSec: [4, 5],      desc: "Pull back, show context. Transition into the space." },
  hero:    { role: "HERO",    durRange: [3, 5],  catPri: [12, 3], catSec: [4, 10],     desc: "The money shot. What you're selling." },
  detail:  { role: "DETAIL",  durRange: [2, 3],  catPri: [7, 12], catSec: [6, 3],      desc: "Supporting texture. Sensory close-up." },
  energy:  { role: "ENERGY",  durRange: [2, 3],  catPri: [14, 5], catSec: [11, 3],     desc: "Movement, people, life. The vibe." },
  space:   { role: "SPACE",   durRange: [2, 4],  catPri: [13, 4], catSec: [10, 3],     desc: "Architecture, ambiance, the room itself." },
  closer:  { role: "CLOSER",  durRange: [2, 3],  catPri: [18, 1], catSec: [10, 2],     desc: "Logo reveal + CTA. End on brand." },
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
  pad: {
    name: "Par-A-Dice",
    paceMultiplier: 1.2,
    beatsByTier: {
      quick:    ["hook", "energy", "hero", "closer"],
      short:    ["hook", "space", "energy", "hero", "closer"],
      standard: ["hook", "space", "energy", "hero", "space", "detail", "energy", "closer"],
      long:     ["hook", "space", "energy", "hero", "space", "detail", "energy", "space", "hero", "energy", "closer"],
    },
    subjects: ["casino floor", "slot machines", "poker table", "hotel room", "property exterior at night", "entertainment", "Boyd Rewards", "jackpot moment"],
    hooks: [
      "East Peoria's best-kept secret.",
      "Your lucky night starts now.",
      "More than a casino.",
      "Where the Illinois River meets Lady Luck.",
      "The only place you need to be tonight.",
    ],
    ctas: [
      "Join Boyd Rewards — link in bio",
      "21 Blackjack Blvd, East Peoria",
      "Book your stay",
      "See what's playing this weekend",
      "Follow for more from the floor",
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
function pickStyleForShot(outletId, catIds, existing, temperature) {
  const key = { tl: "t", wb: "w", nd: "n", pad: "p" }[outletId];
  const brandTarget = brandTargets[outletId];
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
    return brand * 0.5 + harmony * 0.5;
  });
  return weightedPick(safe, scores, temperature || 0.4);
}

function generateStoryboard(outletId, temp, tierId) {
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
    const camera = pickStyleForShot(outletId, beat.catPri, allPicked, temp);
    if (camera) allPicked.push(camera);
    const support = pickStyleForShot(outletId, beat.catSec, allPicked, temp);
    if (support) allPicked.push(support);

    // Smart shot descriptions based on beat role + subject + outlet
    let action = "";
    if (beatKey === "hook") {
      const hookActions = [
        `Extreme close-up: ${subject} texture fills the frame`,
        `Quick burst: sizzle / pour / crack — pure sensory impact`,
        `Bold movement into ${subject} — the first thing they see`,
        `Dramatic reveal: darkness to light on ${subject}`,
      ];
      action = pick(hookActions);
    } else if (beatKey === "reveal") {
      const revealActions = [
        `Pull back to show the full setting around ${subject}`,
        `Dolly through the entrance into the space`,
        `Transition from detail to wide — the venue emerges`,
        `Camera rises to reveal the room, ${subject} in foreground`,
      ];
      action = pick(revealActions);
    } else if (beatKey === "hero") {
      const heroActions = [
        `Beauty shot: ${subject} in its full glory, perfectly lit`,
        `${subject} presented — this is the money shot`,
        `Slow, intentional framing of ${subject} at its best`,
        `The plate / glass / moment arrives — ${subject} hero angle`,
      ];
      action = pick(heroActions);
    } else if (beatKey === "detail") {
      const detailActions = [
        `Tight on a sensory detail: steam, condensation, texture of ${subject}`,
        `Hands interact with ${subject} — pour, cut, garnish, touch`,
        `Macro moment: the detail that makes ${subject} real`,
        `Supporting close-up that adds depth to the hero`,
      ];
      action = pick(detailActions);
    } else if (beatKey === "energy") {
      const energyActions = [
        `People: laughter, clinking glasses, the crowd alive`,
        `Motion: the bartender shakes, the server walks, the band plays`,
        `Candid moment — real guests enjoying the space`,
        `The energy of the room in one shot — movement, light, sound`,
      ];
      action = pick(energyActions);
    } else if (beatKey === "space") {
      const spaceActions = [
        `Wide shot: the full venue / room / architecture breathes`,
        `Atmospheric sweep of the space — lighting, design, mood`,
        `The environment as character — this is where it happens`,
        `Slow pan across the room, taking in the atmosphere`,
      ];
      action = pick(spaceActions);
    } else if (beatKey === "closer") {
      const closerActions = [
        `Logo reveal with ${subject} in background`,
        `Final frame: brand mark + CTA text overlay`,
        `Closing shot: the venue glowing + logo lands`,
        `End card: logo + "${cta}"`,
      ];
      action = pick(closerActions);
    }

    return {
      num: i + 1,
      beat: beat.role,
      duration: durations[i],
      action,
      styles: [camera, support].filter(Boolean),
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
  const [genOutlet, setGenOutlet] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [locked, setLocked] = useState({});
  const [shotList, setShotList] = useState([]); // array of { style: [id,name,outlets], subject: "", why: "" }
  const [toast, setToast] = useState(null);
  const [temperature, setTemperature] = useState(0.4); // 0-1
  const [savedRecipes, setSavedRecipes] = useState([]); // { name, outlet, recipe, coherence, timestamp }
  const [savingName, setSavingName] = useState(null); // string when save dialog is open
  const [storyboard, setStoryboard] = useState(null);
  const [sbOutlet, setSbOutlet] = useState(null);
  const [sbTier, setSbTier] = useState(null);

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
    setRecipe(null);
    setLocked({});
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
    showToast(`+ #${style[0]} added`);
  }, [showToast]);

  const removeFromShotList = useCallback((styleId) => {
    setShotList(prev => prev.filter(s => s.style[0] !== styleId));
  }, []);

  const updateShotItem = useCallback((styleId, field, value) => {
    setShotList(prev => prev.map(s => s.style[0] === styleId ? { ...s, [field]: value } : s));
  }, []);

  const addRecipeToShotList = useCallback(() => {
    if (!recipe) return;
    setShotList(prev => {
      const ids = new Set(prev.map(s => s.style[0]));
      const newItems = recipe.filter(item => !ids.has(item.style[0])).map(item => ({ style: item.style, subject: "", why: "" }));
      return [...prev, ...newItems];
    });
    showToast(`+ ${recipe.length} styles added`);
  }, [recipe, showToast]);

  const doGenerate = useCallback((oid) => {
    const newRecipe = generateRecipe(oid, temperature);
    if (recipe && Object.keys(locked).length > 0) {
      const lockedStyles = {};
      for (const item of recipe) {
        if (locked[item.slot]) lockedStyles[item.slot] = item;
      }
      const merged = newRecipe.map(item => lockedStyles[item.slot] || item);
      for (const slot of Object.keys(lockedStyles)) {
        if (!merged.find(m => m.slot === slot)) merged.push(lockedStyles[slot]);
      }
      setRecipe(merged);
    } else {
      setRecipe(newRecipe);
    }
  }, [recipe, locked, temperature]);

  const saveRecipe = useCallback((name) => {
    if (!recipe || !genOutlet || !name.trim()) return;
    const coherence = computeCoherence(recipe, genOutlet);
    setSavedRecipes(prev => [...prev, { name: name.trim(), outlet: genOutlet, recipe: [...recipe], coherence, timestamp: Date.now() }]);
    setSavingName(null);
    showToast(`Saved: ${name.trim()}`);
  }, [recipe, genOutlet, showToast]);

  const toggleLock = useCallback((slotLabel) => {
    setLocked(prev => {
      const next = { ...prev };
      if (next[slotLabel]) delete next[slotLabel];
      else next[slotLabel] = true;
      return next;
    });
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
          <Box onClick={() => setMode("browse")}>
            <span style={{ fontSize: 32 }}>📂</span>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>Browse</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Explore 1,000 styles</div>
          </Box>
          <Box onClick={() => setMode("generate")}>
            <span style={{ fontSize: 32 }}>🎲</span>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>Generate</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Smart content recipe</div>
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
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>Saved Combos</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
              {savedRecipes.length === 0 ? "None yet" : `${savedRecipes.length} saved`}
            </div>
          </Box>
          <Box onClick={() => setMode("storyboard")}>
            <span style={{ fontSize: 32 }}>🎬</span>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>Storyboard</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Generate a full ad</div>
          </Box>
        </div>
        <Toast />
      </Shell>
    );
  }

  // SAVED RECIPES VIEW
  if (mode === "saved") {
    return (
      <Shell title="Saved Combos" crumbs={[]} onBack={goHome}>
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
      <Shell title="Shot List" crumbs={[]} onBack={goHome}>
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
      <Shell title="Storyboard — Pick an Outlet" crumbs={[]} onBack={goHome}>
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

  // STORYBOARD MODE — pick duration
  if (mode === "storyboard" && sbOutlet && !sbTier) {
    const ol = outlets.find(o => o.id === sbOutlet);
    return (
      <Shell title={`${ol.icon} ${ol.name} — Pick Length`} crumbs={[]} onBack={() => setSbOutlet(null)}>
        <div style={grid2}>
          {durationTiers.map(t => {
            const beats = adStructures[sbOutlet].beatsByTier[t.id];
            return (
              <Box key={t.id} onClick={() => { setSbTier(t.id); setStoryboard(generateStoryboard(sbOutlet, temperature, t.id)); }}>
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
      <Shell title={`${ol.icon} ${ol.name} — ${tier.label} Ad`} crumbs={[]} onBack={() => { setSbTier(null); setStoryboard(null); }}>
        {/* Header: subject + duration */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>"{storyboard.hook}"</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
            Subject: <span style={{ color: "#AAA" }}>{storyboard.subject}</span> · {storyboard.totalDuration}s · {storyboard.shotCount} shots
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
          <button onClick={() => setStoryboard(generateStoryboard(sbOutlet, temperature, sbTier))} style={generateBtn}>🎲 Reroll</button>
          <button onClick={() => {
            storyboard.shots.forEach(sh => {
              sh.styles.forEach(s => {
                if (!shotList.find(item => item.style[0] === s[0])) {
                  setShotList(prev => [...prev, { style: s, subject: storyboard.subject, why: `Shot ${sh.num}: ${sh.beat}` }]);
                }
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
              text += `  Styles: ${sh.styles.map(s => `#${s[0]} ${s[1]}`).join(", ")}\n\n`;
            });
            text += `CTA: ${storyboard.cta}\n\n`;
            text += `CAPTION:\n${storyboard.caption}`;
            navigator.clipboard?.writeText(text);
            showToast("Copied storyboard");
          }} style={generateBtn}>📄 Copy</button>
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
              <div style={{ fontSize: 13, color: "#CCC", lineHeight: 1.5, marginBottom: 8 }}>{sh.action}</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {sh.styles.map(s => (
                  <span key={s[0]} style={{ fontSize: 10, color: "#777", background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: 4, padding: "2px 6px" }}>
                    #{s[0]} {s[1]}
                  </span>
                ))}
              </div>
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

  // GENERATE MODE — pick outlet
  if (mode === "generate" && !genOutlet) {
    return (
      <Shell title="Generate — Pick an Outlet" crumbs={[]} onBack={goHome}>
        <div style={grid2}>
          {outlets.map(o => (
            <Box key={o.id} onClick={() => { setGenOutlet(o.id); doGenerate(o.id); }}>
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

  // GENERATE MODE — show recipe
  if (mode === "generate" && genOutlet && recipe) {
    const ol = outlets.find(o => o.id === genOutlet);
    const coherence = computeCoherence(recipe, genOutlet);
    const tempIdx = Math.min(4, Math.floor(temperature * 5));
    return (
      <Shell title={`${ol.icon} ${ol.name} — Recipe`} crumbs={[]} onBack={() => { setGenOutlet(null); setRecipe(null); setLocked({}); setSavingName(null); }}>
        {/* Coherence bar */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "1px" }}>Coherence</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: coherence > 0.75 ? "#6ABF6A" : coherence > 0.5 ? "#BFA64A" : "#BF6A4A" }}>{Math.round(coherence * 100)}%</span>
          </div>
          <div style={{ height: 4, background: "#1A1A1A", borderRadius: 2 }}>
            <div style={{ height: 4, borderRadius: 2, width: `${coherence * 100}%`, background: coherence > 0.75 ? "#3A7A3A" : coherence > 0.5 ? "#7A6A2A" : "#7A3A2A", transition: "width 0.3s" }} />
          </div>
        </div>

        {/* Temperature slider */}
        <div style={{ marginBottom: 20, background: "#111", borderRadius: 8, padding: "12px 16px", border: "1px solid #1E1E1E" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "1px" }}>Creativity</span>
            <span style={{ fontSize: 12, color: "#AAA" }}>{tempLabels[tempIdx]}</span>
          </div>
          <input
            type="range" min="0" max="1" step="0.05" value={temperature}
            onChange={e => setTemperature(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#888" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#444", marginTop: 4 }}>
            <span>Brand Lock</span><span>Wild Card</span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <button onClick={() => doGenerate(genOutlet)} style={generateBtn}>🎲 Reroll</button>
          <button onClick={addRecipeToShotList} style={generateBtn}>📋 Shot List</button>
          <button onClick={() => setSavingName("")} style={generateBtn}>💾 Save</button>
          <span style={{ fontSize: 12, color: "#555" }}>
            {Object.keys(locked).length > 0 ? `${Object.keys(locked).length} locked` : "tap to lock"}
          </span>
        </div>

        {/* Save dialog */}
        {savingName !== null && (
          <div style={{ background: "#151515", border: "1px solid #2A2A2A", borderRadius: 8, padding: "14px 16px", marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
            <input
              value={savingName}
              onChange={e => setSavingName(e.target.value)}
              placeholder="Name this combo..."
              autoFocus
              onKeyDown={e => e.key === "Enter" && saveRecipe(savingName)}
              style={{ ...inputStyle, flex: 1 }}
            />
            <button onClick={() => saveRecipe(savingName)} style={{ ...generateBtn, color: "#6ABF6A", borderColor: "#2A4A2A" }}>Save</button>
            <button onClick={() => setSavingName(null)} style={{ ...generateBtn, color: "#888" }}>Cancel</button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recipe.map((item, i) => {
            const isLocked = locked[item.slot];
            const otherOutlets = item.style[2].split("").map(k => outletKey[k]).filter(o => o !== genOutlet);
            return (
              <div
                key={item.slot + "-" + item.style[0]}
                style={{
                  background: isLocked ? "#1A1712" : "#111",
                  border: `1px solid ${isLocked ? "#4A3A1A" : "#1E1E1E"}`,
                  borderRadius: 8,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  transition: "all 0.15s",
                }}
              >
                <div
                  onClick={() => toggleLock(item.slot)}
                  style={{ minWidth: 28, textAlign: "center", fontSize: 14, marginTop: 1, cursor: "pointer" }}
                >
                  {isLocked ? "🔒" : "🔓"}
                </div>
                <div style={{ flex: 1, cursor: "pointer" }} onClick={() => toggleLock(item.slot)}>
                  <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "monospace" }}>
                    {item.slot}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4, lineHeight: 1.4 }}>
                    {item.style[1]}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <span style={{ fontSize: 10, color: "#555", fontFamily: "monospace" }}>#{item.style[0]}</span>
                    {otherOutlets.length > 0 && (
                      <div style={{ display: "flex", gap: 3 }}>
                        {otherOutlets.map(o => {
                          const oo = outlets.find(x => x.id === o);
                          return <span key={o} style={{ fontSize: 11 }}>{oo?.icon}</span>;
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <AddBtn style={item.style} />
              </div>
            );
          })}
        </div>
        <Toast />
      </Shell>
    );
  }

  // BROWSE MODE — Level 0: Outlets
  if (mode === "browse" && path.length === 0) {
    return (
      <Shell title="Browse — Select an Outlet" crumbs={[]} onBack={goHome}>
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
      <Shell title={`${selectedOutlet.icon} ${selectedOutlet.name}`} crumbs={crumbs} onBack={back}>
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
      <Shell title={selectedCat.name} crumbs={crumbs} onBack={back}>
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

function Shell({ title, crumbs, onBack, children }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0A0A0A", color: "#E0E0E0", minHeight: "100vh", padding: "20px 24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }`}</style>
      {onBack && (
        <button onClick={onBack} style={backBtn}>← Back</button>
      )}
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
