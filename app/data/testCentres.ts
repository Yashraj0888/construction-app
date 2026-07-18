// Real UK CITB Health, Safety & Environment Test Centres
// Coordinates will be resolved at runtime via postcodes.io
export interface TestCentreBase {
  name: string;
  address: string;
  postcode: string;
}

export interface TestCentre extends TestCentreBase {
  lat: number;
  lng: number;
}

export const TEST_CENTRES_RAW: TestCentreBase[] = [
  { name: "Aberdeen Test Centre", address: "Ground Floor East Wing, Migvie House, 23 North Silver Street, Aberdeen", postcode: "AB10 1RJ" },
  { name: "Aberystwyth Test Centre", address: "Ground Floor, 33 North Parade, Aberystwyth", postcode: "SY23 2JN" },
  { name: "Aldershot Test Centre", address: "Ground Floor, 1 London House, Pickford Street, Aldershot", postcode: "GU11 1TY" },
  { name: "Andover Test Centre", address: "Portland House First Floor, 55-57 High Street, Andover", postcode: "SP10 1LP" },
  { name: "Aylesbury Test Centre", address: "Unit 2a, Ground Floor, Midshires Business Park, Smeaton Close, Aylesbury", postcode: "HP19 8HL" },
  { name: "Ayr Test Centre", address: "1st Floor, 7A Boswell Park, Ayr", postcode: "KA7 1NP" },
  { name: "Ballymena Test Centre", address: "Units 3 & 4 The Tower Centre, Wellington Street, Ballymena", postcode: "BT43 6AH" },
  { name: "Bangor Test Centre", address: "331 High Street, Bangor", postcode: "LL57 1YA" },
  { name: "Barnstaple Test Centre", address: "Riverside Court, Offices - Unit 1 and 4, Castle Street, Barnstaple", postcode: "EX31 1DR" },
  { name: "Barrow Test Centre", address: "111 Duke Street, Barrow in Furness", postcode: "LA14 1XA" },
  { name: "Basildon Test Centre", address: "Southgate House, Suite 1A - First Floor, Town Square, Basildon", postcode: "SS14 1BN" },
  { name: "Belfast Test Centre", address: "1st Floor, 119 Royal Avenue, Belfast", postcode: "BT1 1FF" },
  { name: "Berwick Test Centre", address: "William Edgar Building, 56-58 Castlegate, Berwick", postcode: "TD15 1JT" },
  { name: "Birmingham Test Centre", address: "38 Dale End, Birmingham", postcode: "B4 7NJ" },
  { name: "Bournemouth Test Centre", address: "Roddis House 3rd floor, Old Christchurch Rd, Bournemouth", postcode: "BH1 1LG" },
  { name: "Bridgend Test Centre", address: "2nd Floor, Brackla House, Brackla Street, Bridgend", postcode: "CF31 1BZ" },
  { name: "Brighton Test Centre", address: "Citygate - Ground Floor, 185 Dyke Road, Hove, Brighton", postcode: "BN3 1TL" },
  { name: "Bristol Test Centre", address: "Building 340, The Crescent, Bristol Business Park, Bristol", postcode: "BS16 1EJ" },
  { name: "Builth Wells Test Centre", address: "Rear of Spar Buildings, Groe Street, Builth Well", postcode: "LD2 3BL" },
  { name: "Bury St. Edmunds Test Centre", address: "2nd Floor St Edmunds House, Lower Baxter Street, Bury St Edmunds", postcode: "IP33 1ET" },
  { name: "Cambridge Test Centre", address: "Second Floor, St Andrews House 59, St.Andrews Street, Cambridge", postcode: "CB2 3BZ" },
  { name: "Canterbury Test Centre", address: "Suite C, Invicta House, Lower Bridge Street, Canterbury", postcode: "CT1 2LG" },
  { name: "Cardiff Test Centre", address: "3rd Floor Limerick House, Churchill Way, Cardiff", postcode: "CF10 2HE" },
  { name: "Carlisle Test Centre", address: "10a Lowther Street, Carlisle", postcode: "CA3 8DA" },
  { name: "Chatham Test Centre", address: "14-16 High Street, Chatham", postcode: "ME4 4EP" },
  { name: "Chelmsford Test Centre", address: "1st Floor Grosvenor House, 51 New London Rd, Chelmsford", postcode: "CM2 0ND" },
  { name: "Cheltenham Test Centre", address: "18 to 20 Albion Street, Cheltenham", postcode: "GL52 2LP" },
  { name: "Chester Test Centre", address: "1 Corbridge House, The Square Seller Street, Chester", postcode: "CH1 3AN" },
  { name: "Chesterfield Test Centre", address: "Suite 1B, 1st Floor 6-8 Corporation St, Chesterfield", postcode: "S41 7TP" },
  { name: "Chichester Test Centre", address: "Metro House, Northgate, Chichester", postcode: "PO19 1BE" },
  { name: "Clydebank Test Centre", address: "1st floor, Erskine House, North Avenue, Clydebank", postcode: "G81 2DR" },
  { name: "Colchester Test Centre", address: "Wellington House, Butt Road, Colchester", postcode: "CO3 3DA" },
  { name: "Corby Test Centre", address: "Corby Innovation Hub, Bangrave Road South, Corby", postcode: "NN17 1NN" },
  { name: "Coventry Test Centre", address: "1st Floor Warwick Gate, 21 - 22 Warwick Row, Coventry", postcode: "CV1 1ET" },
  { name: "Croydon Test Centre", address: "Second Floor - Central House, 27 Park Street, Croydon, London", postcode: "CR0 1YD" },
  { name: "Derby Test Centre", address: "Ground Floor East Wing, 100 Mansfield Road, Derby", postcode: "DE1 3TT" },
  { name: "Doncaster Test Centre", address: "Office 6 Silver House, Silver Street, Doncaster", postcode: "DN1 1HL" },
  { name: "Dudley Test Centre", address: "Trafalgar House, 47 -49 King Street, Dudley", postcode: "DY2 8PS" },
  { name: "Dumfries Test Centre", address: "77 - 79 Whitesands Unit 3, Dumfries", postcode: "DG1 2RX" },
  { name: "Dundee Test Centre", address: "Unit 214 - 22 Exchange St, Dundee", postcode: "DD1 3DE" },
  { name: "Eastbourne Test Centre", address: "Senlac House, Ground Floor, 53-58 Seaside, Eastbourne", postcode: "BN22 7NE" },
  { name: "Edinburgh Test Centre", address: "Suite 2, 2nd floor, Cairncross House, 25 Union Street, Edinburgh", postcode: "EH1 3LR" },
  { name: "Elgin Test Centre", address: "2 Southfield Drive (Near Linkwood Medical Centre), Elgin", postcode: "IV30 6GR" },
  { name: "Exeter Test Centre", address: "3rd Floor, North Suite, Beaufort House, New North Road, Exeter", postcode: "EX4 4EP" },
  { name: "Fareham Test Centre", address: "Thackery House, 189-199 West Street, Fareham", postcode: "PO16 0EN" },
  { name: "Fort William Test Centre", address: "The Nevis Centre (off Camanachd Cres), An Aird, Fort William", postcode: "PH33 6AN" },
  { name: "Frome Test Centre", address: "2 Baywell House (under archway), Tucker Close, Frome", postcode: "BA11 5LS" },
  { name: "Gairloch Test Centre", address: "Harbour Gairloch, Gairloch", postcode: "IV21 2BQ" },
  { name: "Galashiels Test Centre", address: "45 High Street, Galashiels, Scottish Border", postcode: "TD1 1RY" },
  { name: "Glasgow Test Centre", address: "Suite 325, Pentagon Centre, 36-38 Washington Street, Glasgow", postcode: "G3 8AZ" },
  { name: "Gloucester Test Centre", address: "Eastgate House 121 - 131 Eastgate Street, Gloucester", postcode: "GL1 1PX" },
  { name: "Grantham Test Centre", address: "1st Floor, The George Centre, Guildhall Street, Grantham", postcode: "NG31 6NJ" },
  { name: "Greenock Test Centre", address: "Ground Floor Victory Court, Cartsburn Maritime, Arthur Street, Greenock", postcode: "PA15 4RT" },
  { name: "Grimsby Test Centre", address: "Unit 8/9 Acorn Business Park, Moss Road, Grimsby", postcode: "DN32 0LW" },
  { name: "Guildford Test Centre", address: "71 North Street, Guildford", postcode: "GU1 4AW" },
  { name: "Harrogate Test Centre", address: "1st Floor Strayside House, 27 West park, Harrogate", postcode: "HG1 1BJ" },
  { name: "Hastings Test Centre", address: "Philips House, Drury Lane, Ponswood Industrial Estate, St Leonards on Sea", postcode: "TN38 9BA" },
  { name: "Haverfordwest Test Centre", address: "First Floor Offices, 34 High Street, Haverfordwest", postcode: "SA61 2DA" },
  { name: "Helmsdale Test Centre", address: "Car Park, Couper Park Highlands, Helmsdal", postcode: "KW8 6HH" },
  { name: "Hereford Test Centre", address: "Ground Floor Penn House, 9-10 Broad Street, Hereford", postcode: "HR4 9AP" },
  { name: "Horley Test Centre", address: "77 Victoria Road, Horley, Surrey", postcode: "RH6 7QH" },
  { name: "Huddersfield Test Centre", address: "5th Floor Ramsden House, New Street, Huddersfiel", postcode: "HD1 2TW" },
  { name: "Hull Test Centre", address: "Unit 14/15 Kingston House South, Bond Street, Hull", postcode: "HU1 3EN" },
  { name: "Inverness Test Centre", address: "2nd Floor, 1-3 Church Street, Inverness", postcode: "IV1 1DY" },
  { name: "Ipswich Test Centre", address: "Hubbard House, Second Floor, 6 Civic Drive, Ipswich", postcode: "IP1 2QA" },
  { name: "Isle of Arran Test Centre", address: "Auchrannie Country House & Hotel Brodick, Isle of Arran", postcode: "KA27 8BZ" },
  { name: "Isle of Benbecula Test Centre", address: "Caladh Trust Centre, Balivanich East Camp, Balivanich, Isle of Benbecul", postcode: "HS7 5LA" },
  { name: "Isle of Islay Test Centre", address: "Argyll & Bute Councils Service Point, Jamieson Street, BowmoreIsle of Islay", postcode: "PA43 7HZ" },
  { name: "Isle of Mull Test Centre", address: "Mull and Iona Community Trust, An Roth Community Enterprise Centre, CraignureIsle of Mull", postcode: "PA65 6AY" },
  { name: "Isle of Scilly Test Centre", address: "Porthmellon Enterprise Centre, Porthmellon Business Park, St MarysIsles of Scilly", postcode: "TR21 0JY" },
  { name: "Isle of Wight Test Centre", address: "48 Lugley Street, NewportIsle of Wight", postcode: "PO30 5HD" },
  { name: "Kendal Test Centre", address: "Office Suites 250 Kentgate Place, Kendal", postcode: "LA9 6EQ" },
  { name: "Kings Lynn Test Centre", address: "Mission Hall Ship Lane, Off St.Anns Street, Kings Lynn", postcode: "PE30 1LT" },
  { name: "Kirkwall Test Centre", address: "THE PICKAQUOY CENTRE (Sports Arts Leisure Conf. Facility) Muddisdale Road, Kirkwall", postcode: "KW15 1LR" },
  { name: "Kyle of Lochalsh Test Centre", address: "Loch al sh Hotel - Ferry Road Ross Shire, Kyle of Lochalsh", postcode: "IV40 8AF" },
  { name: "Leeds Test Centre", address: "Gallery House 1st Floor The Headrow, Leeds", postcode: "LS1 5RD" },
  { name: "Leicester Test Centre", address: "Suite 3A Third Floor Rutland Centre 56 Halford Street, Leicester", postcode: "LE1 1TQ" },
  { name: "Lerwick Test Centre", address: "Islesburgh Community Centre, King Harald St, Lerwick", postcode: "ZE1 0EQ" },
  { name: "Lincoln Test Centre", address: "1st Floor, Queensgate House 12 Silver St, Lincoln", postcode: "LN2 1DY" },
  { name: "Liverpool Test Centre", address: "Lower Ground Floor, 5 Covent Gardens, Liverpool", postcode: "L2 8UD" },
  { name: "Lowestoft Test Centre", address: "2nd Floor Waveney Chambers, 3-7 Waveney Road, Lowestoft", postcode: "NR32 1BN" },
  { name: "Manchester Test Centre", address: "Blue Zone Ground Floor Suites 3 & 4 Universal Square Devonshire Street North, Manchester", postcode: "M12 6JH" },
  { name: "Merthyr Tydfil Test Centre", address: "1st Floor, Castle House, Glebeland Street, Merthyr Tydfil", postcode: "CF47 8AT" },
  { name: "Middlesbrough Test Centre", address: "Cleveland Business Centre, Watson Street, Middlesbrough", postcode: "TS1 2RQ" },
  { name: "Mile End C Test Centre", address: "3 Quebec Wharf, 14 Thomas Road, Limehouse B, London", postcode: "E14 7AF" },
  { name: "Milton Keynes Test Centre", address: "Ground Floor, 249 Midsummer Boulevard, Milton Keynes", postcode: "MK9 1DP" },
  { name: "Morpeth Test Centre", address: "Unit 7 Telford Court, Loansdean, Morpeth", postcode: "NE61 2DB" },
  { name: "Newcastle Upon Tyne Test Centre", address: "Collingwood House, 3 Collingwood Street, Newcastle Upon Tyne", postcode: "NE1 1JW" },
  { name: "Newport (Gwent) Test Centre", address: "6th Floor Clarence House (South Wales) Clarence Place, Newport (Gwent)", postcode: "NP19 7AA" },
  { name: "Newport (Isle of Wight) Test Centre", address: "48 Lugley Street, Newport (Isle of Wight)", postcode: "PO30 5HD" },
  { name: "Northallerton Test Centre", address: "First Floor, Carrick House, Thurston Road, Northallerton", postcode: "DL6 2NA" },
  { name: "Northampton Test Centre", address: "Suite 201 Sol House, 29 St.Katherine's Street, Northampton", postcode: "NN1 2QZ" },
  { name: "Norwich Test Centre", address: "1st Floor, 11 Prince of Wales Road, Norwich", postcode: "NR1 1BD" },
  { name: "Nottingham Test Centre", address: "Chiltern House, Castle Gate, Nottingham", postcode: "NG1 7AR" },
  { name: "Oban Test Centre", address: "Corran Halls, No. 54 The Esplanade, Oban", postcode: "PA34 5AB" },
  { name: "Oldham Test Centre", address: "5A - 6A Whitney Court Southlink Business Park, Hamilton Street, Oldham", postcode: "OL4 1DE" },
  { name: "Omagh Test Centre", address: "Anderson House, 41 Market Street, Omagh", postcode: "BT78 1EE" },
  { name: "Oxford Test Centre", address: "Top Floor (Buzzer 9), 58 St Aldates, Oxford", postcode: "OX1 1ST" },
  { name: "Penzance Test Centre", address: "Knights Warehouse Bread Street (Corner of Bread St & Belgravia St), Penzance Cornwall", postcode: "TR18 2EQ" },
  { name: "Peterborough Test Centre", address: "Pearson Professional Centre, Ground Floor East Wing, Stuart House, St Johns Street, Peterborough", postcode: "PE1 5DD" },
  { name: "Pitlochry Test Centre", address: "Fishers Hotel 75 -79 Atholl Road, Pitlochry", postcode: "PH16 5BN" },
  { name: "Plymouth Test Centre", address: "Princess Court, 1st Floor Princess Street, Plymouth", postcode: "PL1 2EX" },
  { name: "Portree Test Centre", address: "CO-OP Supermarket, Dunvegan Road, Portree", postcode: "IV51 9HQ" },
  { name: "Portsmouth Test Centre", address: "Ground Floor Annex - Enterprise House, Ismbard Brunel Road, Portsmouth", postcode: "PO1 2AF" },
  { name: "Preston Test Centre", address: "Ground Floor Norwest Court, Guildhall Street, Preston", postcode: "PR1 3NU" },
  { name: "Reading Test Centre", address: "2nd Floor Havell House, 62-66 Queens Road, Reading", postcode: "RG1 4AZ" },
  { name: "Redditch Test Centre", address: "Second Floor Grosvenor House, Prospect Hill, Redditch", postcode: "B97 4DL" },
  { name: "Rhyl Test Centre", address: "Pearson Centre - Rhyl, 3 Bodfor Street, Rhyl", postcode: "LL18 1AS" },
  { name: "Salisbury Test Centre", address: "Suite 104, Ground Floor, Warner House, 123 Castle Street, Salisbury", postcode: "SP1 3TB" },
  { name: "Scarborough Test Centre", address: "Suite 229-30 St Nicholas Street, Scarborough", postcode: "YO11 2HF" },
  { name: "Scunthorpe Test Centre", address: "Haldenby House (Unit 2A), Doncaster Road, Scunthorpe", postcode: "DN15 7DQ" },
  { name: "Sheffield Test Centre", address: "Orchard House 3rd floor, Leopold Street, Sheffield", postcode: "S1 2GY" },
  { name: "Shrewsbury Test Centre", address: "Suite 2 Canon Court West, Abbey Lawn, Abbey Foregate, Shrewsbury", postcode: "SY2 5DE" },
  { name: "Skipton Test Centre", address: "Suite 3, First floor, High St House (access via Newmarket St) High St, Skipton", postcode: "BD23 2HU" },
  { name: "Slough Test Centre", address: "Brooklands House, Brookland Business Centre, Petersfield Avenue, Slough", postcode: "SL2 5DY" },
  { name: "Southampton Test Centre", address: "SECOND FLOOR SOUTH SUITE, ANGLO CITY HOUSE 2-6 SHIRLEY ROAD, SOUTHAMPTON", postcode: "SO15 3EU" },
  { name: "Southend on Sea Test Centre", address: "2nd floor, Dencora Court, Tylers Avenue, Southend on Sea", postcode: "SS1 2BB" },
  { name: "Southgate Test Centre", address: "1st Floor Crown House, 47 Chase Side, Southgate (London)", postcode: "N14 5BP" },
  { name: "Southwark Test Centre", address: "10 Holyrood Street, London, Southwark", postcode: "SE1 2EL" },
  { name: "Staines Test Centre", address: "First Floor, 11/17 Kingston Road, Staines", postcode: "TW18 4QX" },
  { name: "Stevenage Test Centre", address: "Middlesex House, Meadway Technology Park, Rutherford Close, Stevenage", postcode: "SG1 2EF" },
  { name: "Stirling Test Centre", address: "Hillside House Suite 1A, Laurelhill Business Park, Stirling", postcode: "FK7 9JQ" },
  { name: "Stockport Test Centre", address: "Ground Floor Kingsgate, Wellington Road North, Stockport", postcode: "SK4 1LW" },
  { name: "Stoke on Trent Test Centre", address: "Unit 8a Whittle Court, Town Road Business Quarter, Hanley, Stoke on Trent", postcode: "ST1 2QE" },
  { name: "Stornoway Test Centre", address: "Caladh Inn, 11 James Street, Stornoway", postcode: "HS1 2QN" },
  { name: "Stranraer Test Centre", address: "The Millennium Centre, 75 George Street, Stranraer", postcode: "DG9 7JP" },
  { name: "Stratford Upon Avon Test Centre", address: "2nd Floor, Packwood House, Guild Street, Stratford upon Avon", postcode: "CV37 6RP" },
  { name: "Sutton Coldfield Test Centre", address: "Ground Floor, 31-33 Birmingham Road, Sutton Coldfield", postcode: "B72 1QE" },
  { name: "Swansea Test Centre", address: "2nd Floor Grove House, 3 Grove Place, Swansea", postcode: "SA1 5DF" },
  { name: "Swindon Test Centre", address: "Ambrose House, Grd Flr South Suite, 30-33 Milton Road, Swindon", postcode: "SN1 5JA" },
  { name: "Tarbert Test Centre", address: "Templer Arts and Leisure Centre, Harbour Street, Tarbert", postcode: "PA29 6UD" },
  { name: "Taunton Test Centre", address: "Ground Floor, Victoria House, Victoria Street, Taunton", postcode: "TA1 3FA" },
  { name: "Tongue Test Centre", address: "The Tongue Hotel, Tongue, Sutherland", postcode: "IV27 4XD" },
  { name: "Torquay Test Centre", address: "Castle Circus House, Rooms 36 - 38136 Union Street, Torquay", postcode: "TQ2 5QB" },
  { name: "Truro Test Centre", address: "Palace Buildings, Quay Street, Truro", postcode: "TR1 2HE" },
  { name: "Tunbridge Wells Test Centre", address: "Foundation House, Coach and Horses Passage, The Pantiles, Royal, Tunbridge Wells", postcode: "TN2 5NP" },
  { name: "Ullapool Test Centre", address: "Macphail Centre, Ullapool High School, Mill Street, Ullapool", postcode: "IV26 2UN" },
  { name: "Uxbridge Test Centre", address: "5-7 Pantiles Walk, Pavillions Shopping Centre, Uxbridge", postcode: "UB8 1LP" },
  { name: "Weymouth Test Centre", address: "Phoenix House St. Nicholas Street, Weymouth", postcode: "DT4 8AA" },
  { name: "Wick Test Centre", address: "Wick Harbour, End of the Fish Mart, Wick", postcode: "KW1 5HB" },
  { name: "Wolverhampton Test Centre", address: "2nd Floor Derwent House, 42-46 Waterloo Road, Wolverhampton", postcode: "WV1 4XB" },
  { name: "Worcester Test Centre", address: "3rd Floor Haswell House Block B1, St. Nicholas Street, Worcester", postcode: "WR1 1UN" },
  { name: "Worthing Test Centre", address: "Pearson Professional Centres, Unit 2, Chatsworth House, 39 Chatsworth Road, Worthing", postcode: "BN11 1LY" },
  { name: "Wrexham Test Centre", address: "Unit 7, 3, Henblas Street, Wrexham", postcode: "LL13 8AE" },
  { name: "Yeovil Test Centre", address: "The Coach House, Ground Floor, St Nicholas Close, Penn Hill, Yeovil", postcode: "BA20 1SF" },
  { name: "York Test Centre", address: "Stirling House, Station Business Park, Holgate Park Drive, York", postcode: "YO26 4GB" }
];

/**
 * Fetch real lat/lng for every test centre from postcodes.io.
 * Batches requests in chunks of 100 (API limit) and merges results.
 */
export async function fetchAllCentresWithCoords(): Promise<TestCentre[]> {
  const CHUNK_SIZE = 100;
  const enriched: TestCentre[] = [];

  for (let i = 0; i < TEST_CENTRES_RAW.length; i += CHUNK_SIZE) {
    const chunk = TEST_CENTRES_RAW.slice(i, i + CHUNK_SIZE);
    const postcodes = chunk.map(c => c.postcode.replace(/\s+/g, ""));

    try {
      const res = await fetch("https://api.postcodes.io/postcodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postcodes }),
      });
      const data = await res.json();
      if (data.status === 200 && data.result) {
        data.result.forEach((r: any, idx: number) => {
          if (r.result) {
            enriched.push({
              ...chunk[idx],
              lat: r.result.latitude,
              lng: r.result.longitude,
            });
          }
        });
      } else {
        console.error("postcodes.io batch error", data);
      }
    } catch (e) {
      console.error("postcodes.io fetch failed for chunk", i, e);
    }
  }

  return enriched;
}
