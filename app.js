//------------------------------------------------------------------------------------------------------------------------------------------------------
//Global Variables
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Independent Variables Variables
let totalCrew; //Number of total crew present
let activeCrewTotal; //Number of crew active at a time
let abilityScores; //Number of stats a crewman has
let totalResc; //Number of resc managed for the ship
let threatDay; //Number of days between threat appearances
let startingRes; //Amount of Resources Given to Begin
let baseThreatCost; //Base Threat Cost to Increase Over Time
let dailyTasks; //Number of tasks given daily
let threatTargets; //Number of resource typess hit by a threat
let useStatBoost; //Amount of increase in a stat for its use
let victoryThreshold; //Amount of Victory Needed to Win
let powers; //Number of Powers Usable by the Player
let stasisChange; //Ability for Stasis Crew Buttons to Change Color
let stasisShown; //Show Alternate Colors Based on Stasis Release Schedule
let displayStasis; //Shows Numbered Icons for Stasis Release Schedule

//Miscellaneous Variables
let eventMsgs; //count of display messages
let pendingMsgs; //list of display messages
let frameTally; //number of elapsed frames
let gameOver; //game state of active or finished
let gamePaused; //game state of paused or unpaused
let maxColors; //Max Number of Color Templates for Pixel Chunks
let namePoolM; //Pool of Available Male Names
let namePoolF; //Pool of Available Female Names
let namesM; //Number of Available Male Names
let namesF; //Number of Available Female Names
let canSelectCrew; //Ability to Select Pending Crew
let canUpdateHelp; //Ability to Update the Readout Window
let canMakePopup; //Ability to Create Popup Windows
let canPressTask; //Ability to Resolve Tasks
let statNames; //Flavor Names for Crewman Attributes
let rs; //Flavor Names for Ship Resources
let sexes; //Defines Male or Female Crew
let stasisRelease; //Set of Crewmen in Stasis
let resources; //Set of Resources Managed for the Ship
let currentPop; //Current Popup Details
let winning; //Determines if Player Won
let progressPoint; //Resource for Measuring Progress
let statRotation; //Current Stat Used in Rotation
let threatCost; //Typical cost when a threat arrives
let stasisPersons; //Number of crewmen always in stasis
let powerUsed; //Records Powers that Have Been Used
let firstGame = true; //Determines if Game Has Been Reset
let lastWon = false; //Determines if the Game was Lost Before the Reset

//Event Variables
let threats; //Number of Pending Threats
let threatPool; //List of Pending Threats
let threat; //Active Threat
let events; //Number of Pending Tasks for Each Stat
let eventPool; //List of Pending Tasks for Each Stat
let event; //Active Task
let eventQueue; //Upcoming Tasks for the Day
let eventsQueued; //Number of Tasks Left in the Queue
let day; //Current Day

//Board Variables
let tileSize;
let grassSize;
let columns;
let rows;
let board;
let board3;
let boardWidth;
let boardHeight;
let context;
let context2;
let context3;
let overlay;
let pixes; //Size of Drawn Pixel Chunks
let selectablesSheet; //Window Containing Crew UI
let selectablesWidth;
let selectablesHeight;
let selectableColors;
let readoutWindow; //Window Displaying Details from Another Area
let readoutWindowWidth;
let readoutWindowHeight;
let rescWindow; //Window Displaying Resources
let rescWindowHeight;
let progressWindow; //Window Displaying Progress
let threatWindow; //Window Displaying Upcoming Threat
let threatWindowHeight;
let dayWindow; //Window Displaying Current Day
let dayWindowHeight;
let dayWindowMsg;
let dayWindowImg;
let dayWindowColors;
let taskWindow; //Window Displaying Current Task
let taskWindowHeight;
let taskWindowWidth;
let powerWindow; //Window Displaying Powers
let popup; //Window Displaying Priority
let popupHeight;
let popupWidth;
let popupColorsOff; //Popup Window Inactive Colors
let popupColorsOn; //Popup Window Active Colors
let popTypes; //Types of Different Popup Messages
let pbSize; //Power Button Size

//Animation Cycles + Criteria
let cycleSpace; //Cycle for drawing space
let spaceHeight;
let spaceWidth;
let cycleMaxSpace;
let totalStars;
let starXs;
let starYs;
let animIntervalSpace;
let cycleShip; //Cycle for drawing ships
let cycleMaxShip;
let shipX;
let shipY;
let shipHeight;
let shipWidth;
let shipParts;
let animIntervalShip;
let boomGrid; //Cycle for drawing explosions
let cycleMaxBoom;
let cycleBoom;
let booms;
let boomsList;
let animIntervalBoom;
let cycleCrew; //Cycle for drawing crew
let cycleMaxCrew;
let animIntervalCrew;
let crewmen;
let crewmenList;
let crewGrid;
let crewBoxSize;
let colorBoxStates; //Colors for Selectable Boxes
let cycleIcon; //Cycle for drawing icons
let cycleMaxIcon;
let animIntervalIcon;
let awardGrid; //Size of Award Image

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Startup Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Initial Load
window.onload = function () {
    newGame();

    //Begin Updating Animations
    requestAnimationFrame(update);
}

//Sets Starting Variables for a New Game
function setStart() {
    //Independent Variables Variables
    totalCrew = 6; //Number of total crew present
    activeCrewTotal = 3; //Number of crew active at a time
    abilityScores = 4; //Number of stats a crewman has
    totalResc = 6; //Number of resc managed for the ship
    threatDay = 5; //Number of days between threat appearances
    startingRes = 65; //Amount of Resources Given to Begin
    baseThreatCost = 5; //Base Threat Cost to Increase Over Time
    dailyTasks = 1; //Number of tasks given daily
    threatTargets = 2; //Number of resource typess hit by a threat
    useStatBoost = 1; //Amount of increase in a stat for its use
    victoryThreshold = 100; //Amount of Victory Needed to Win
    powers = 4; //Number of Powers Usable by the Player
    stasisChange = true; //Ability for Stasis Crew Buttons to Change Color
    stasisShown = false; //Show Alternate Colors Based on Stasis Release Schedule
    displayStasis = true; //Shows Numbered Icons for Stasis Release Schedule

    //Miscellaneous Variables
    eventMsgs = 0; //count of display messages
    pendingMsgs = []; //list of display messages
    frameTally = 0; //number of elapsed frames
    gameOver = false; //game state of active or finished
    gamePaused = false; //game state of paused or unpaused
    maxColors = 15; //Max Number of Color Templates for Pixel Chunks
    namePoolM = []; //Pool of Available Male Names
    namePoolF = []; //Pool of Available Female Names
    namesM = 0; //Number of Available Male Names
    namesF = 0; //Number of Available Female Names
    canSelectCrew = true; //Ability to Select Pending Crew
    canUpdateHelp = true; //Ability to Update the Readout Window
    canMakePopup = true; //Ability to Create Popup Windows
    canPressTask = true; //Ability to Resolve Tasks
    statNames = ["CHA", "INT", "PER", "STR"]; //Flavor Names for Crewman Attributes
    rs = ["Amo", "Bio", "Fuel", "Hull", "Morale", "Rep", "PROGRESS"]; //Flavor Names for Ship Resources
    sexes = ["Male", "Female"]; //Defines Male or Female Crew
    stasisRelease = []; //Set of Crewmen in Stasis
    resources = []; //Set of Resources Managed for the Ship
    currentPop; //Current Popup Details
    winning = false; //Determines if Player Won
    progressPoint = totalResc; //Resource for Measuring Progress
    statRotation = -1; //Current Stat Used in Rotation
    threatCost = baseThreatCost; //Typical cost when a threat arrives
    stasisPersons = totalCrew - activeCrewTotal; //Number of crewmen always in stasis
    powerUsed = []; //Records Powers that Have Been Used

    //Event Variables
    threats = 0; //Number of Pending Threats
    threatPool = []; //List of Pending Threats
    threat = 0; //Active Threat
    events = []; //Number of Pending Tasks for Each Stat
    eventPool = []; //List of Pending Tasks for Each Stat
    event; //Active Task
    eventQueue = []; //Upcoming Tasks for the Day
    eventsQueued = 0; //Number of Tasks Left in the Queue
    day = 0; //Current Day

    //Board Variables
    tileSize = 25;
    grassSize = tileSize * 3;
    columns = 30;
    rows = 25;
    board;
    board3;
    boardWidth = columns * tileSize;
    boardHeight = rows * tileSize;
    context;
    context2;
    context3;
    overlay;
    pixes = 3; //Size of Drawn Pixel Chunks
    selectablesSheet; //Window Containing Crew UI
    selectablesWidth = boardWidth;
    selectablesHeight = boardHeight / 6;
    selectableColors = [];
    readoutWindow; //Window Displaying Details from Another Area
    readoutWindowWidth = boardWidth / 3;
    readoutWindowHeight = (boardHeight / 3) + 5;
    rescWindow; //Window Displaying Resources
    rescWindowHeight = 90;
    progressWindow; //Window Displaying Progress
    threatWindow; //Window Displaying Upcoming Threat
    threatWindowHeight;
    dayWindow; //Window Displaying Current Day
    dayWindowHeight = rescWindowHeight;
    dayWindowMsg;
    dayWindowImg;
    dayWindowColors = ["darkgray", "lightgray"];
    taskWindow; //Window Displaying Current Task
    taskWindowHeight;
    taskWindowWidth;
    powerWindow; //Window Displaying Powers
    popup; //Window Displaying Priority
    popupHeight = 350;
    popupWidth = 400;
    popupColorsOff = ["darkorange", "darkred", "darkgoldenrod", "darkgray", "rebeccapurple"]; //Popup Window Inactive Colors
    popupColorsOn = ["orange", "indianred", "goldenrod", "lightgray", "mediumpurple"]; //Popup Window Active Colors
    popTypes = 5; //Types of Different Popup Messages
    pbSize = 100; //Power Button Size

    //Animation Cycles + Criteria
    cycleSpace = 0; //Cycle for drawing space
    spaceHeight = 348;
    spaceWidth = 402;
    cycleMaxSpace = spaceHeight;
    totalStars = 0;
    starXs = [];
    starYs = [];
    animIntervalSpace = 1;
    cycleShip = 3; //Cycle for drawing ships
    cycleMaxShip = 4;
    shipX = (spaceWidth / 2) - 2;
    shipY = (spaceHeight / 2) - 1;
    shipHeight = 0;
    shipWidth = 0;
    shipParts = [];
    animIntervalShip = 30;
    boomGrid = 5; //Cycle for drawing explosions
    cycleMaxBoom = 8;
    cycleBoom = 0;
    booms = 0;
    boomsList = [];
    animIntervalBoom = 2;
    cycleCrew = 0; //Cycle for drawing crew
    cycleMaxCrew = 2;
    animIntervalCrew = 60;
    crewmen = 0;
    crewmenList = [];
    crewGrid = 6;
    crewBoxSize = 120;
    colorBoxStates = ["steelblue", "lightsteelblue", "darkred", "indianred"]; //Colors for Selectable Boxes
    cycleIcon = 0; //Cycle for drawing icons
    cycleMaxIcon = 2;
    animIntervalIcon = 140;
    awardGrid = 7; //Size of Award Image
}

//Initializes a New Game
function newGame() {
    //Adjust Windows
    setStart();
    arrangeWindows();

    //Map Initial Details
    starMap(spaceHeight, spaceWidth);
    shipMap();
    makeSelectableColors();

    //Make Crew
    makeAllCrew();

    //Make Crew UI
    for (let i = 0; i < totalCrew; i++) {
        let num = i + 1;
        let doc = document.getElementById("crew" + num.toString());
        let winStyling = "";
        let winPendingId = "";

        if (firstGame == true) {
            doc.addEventListener("mouseover", highlight);
            doc.addEventListener("mouseout", denounce);
            doc.addEventListener("click", pressTask);
        }

        //Canvas for Each Crewman
        winPendingId = "person" + num.toString();
        winStyling = "left: 0px; top: 0px; width: 120px; height: 120px; position: absolute; z-index: 6; border-radius: 5px;";
        let newPerson = createWin(doc, winPendingId, "canvas", winStyling);

        //Nameplate for Each Crewman
        winPendingId = "plate" + num.toString();
        winStyling = "left: 0px; top: 0px; width: 120px; height: 20px; position: absolute; z-index: 6; user-select: none; color: black; ";
        let newPlate = createWin(doc, winPendingId, "div", winStyling);
        newPlate.innerText = crewmenList[i].name;
    }

    //Give Initial Resources
    giveStartingRes();

    //Creates Starting Popups
    canUpdatHelp = false;
    canSelectCrew = false;
    if (firstGame == true) {
        startingPops();
        firstGame = false;
    } else {
        let aftermath = "Star Voyager\n(Created by Alex H.)\n\n\n";
        aftermath += "Your A.I. has been downloaded into a new vessel.";
        aftermath += "\n\nThe next crew has gathered and is ready to embark.";
        if (lastWon == true) {
            aftermath += "\n\nThey are descendants of your last crew, eager to explore the stars.";
            aftermath += "\n\nAll of them have heard great things about your leadership.";
            aftermath += "\n\nDon't keep them waiting!";
        } else {
            aftermath += "\n\nFleet command does not want a repeat of your last voyage.";
            aftermath += "\n\nThis new crew does not know the fate of its predecessor.";
            aftermath += "\n\nDon't keep them waiting...";
        }
        aftermath += "\n\n";
        popupQueue(aftermath, 0);
    }

    //Generates Initial Pools -- Threats, Tasks, Powers
    makeThreatPool();
    makeEventPool(progressPoint + 1);
    initializePowers();

    //Begin Gameplay
    dayLife();
}

//Clears Existing Objects to Make a New Game
function clearGame() {
    //Delete Windows Created at Game Start
    clearWin("readout");
    clearWin("progress");
    clearWin("resc");
    clearWin("threat");
    clearWin("day");
    clearWin("task");
    clearWin("powerBar");
    for (let i = 0; i < totalCrew; i++) {
        let win = "person" + (i + 1).toString();
        clearWin(win);
        win = "plate" + (i + 1).toString();
        clearWin(win);
    }
    clearWin("popup");
}

//Adjusts the Starting Properties of Specific Elements
function arrangeWindows() {
    //Rearrangement Properties
    let board2;
    let courtesySpacer = 10;
    let leftSpacer = 6;
    let rightSpacer = readoutWindowWidth + (courtesySpacer * 1.2);
    let iBox = document.getElementById("info-box");
    let selectableSpacer = (boardHeight - selectablesHeight) - (courtesySpacer) * 2.5;
    let helpSpacer = ((boardHeight - selectablesHeight) - (readoutWindowHeight + (courtesySpacer * 3.5)));
    let discoSpacer = ((boardHeight - spaceHeight) - (courtesySpacer * 0.5));
    let rescSpacer = boardHeight - (discoSpacer + (courtesySpacer * 8) + rescWindowHeight);
    let dayPads = 2;
    let daySpacer = (rescSpacer - (courtesySpacer * 1.3));
    let progressPads = dayPads * 3;
    dayWindowHeight -= dayPads;
    threatWindowHeight = (boardHeight - ((courtesySpacer * 2.5) + rescSpacer + rescWindowHeight)) - 170;
    taskWindowWidth = (boardWidth - (rightSpacer + (courtesySpacer * 0))) - 4;
    taskWindowHeight = readoutWindowHeight + dayWindowHeight + (courtesySpacer * 1.4);
    let taskSpacer = selectableSpacer - (courtesySpacer + taskWindowHeight);
    let threatPads = dayPads * 1.5;
    let threatWindowHeightMod = threatWindowHeight - threatPads;
    let pbGaps = Math.floor((taskWindowWidth - (pbSize * powers)) / (powers + 1));
    let pbH = Math.floor((threatWindowHeight - pbSize) / 2);

    let winStyling = "";
    let winPendingId = "";

    //Boards
    overlay = document.getElementById("overlay");
    overlay.width = boardWidth;
    overlay.height = boardHeight;

    board = document.getElementById("board");
    board.width = boardWidth + 4;
    board.height = boardHeight + 6;
    context = board.getContext("2d");

    board2 = document.getElementById("board2");
    board2.width = boardWidth + 4;
    board2.height = boardHeight + 6;
    context2 = board2.getContext("2d");

    board3 = document.getElementById("board3");
    board3.width = spaceWidth;
    board3.height = spaceHeight;
    context3 = board3.getContext("2d");

    //Selectable Loadout
    selectablesSheet = document.getElementById("crew-select");
    winStyling = "position: absolute; z-index: 5; left: 0; top:" + (selectableSpacer).toString() + "px; user-select: none; border-radius: 4px; ";
    styleWin(selectablesSheet, winStyling, "cssText");

    //Helper Window
    winPendingId = "readout";
    winStyling = "position: absolute; border: 3px solid darkgoldenrod; border-radius: 4px; z-index: 5; left: " + (courtesySpacer * 0.2) + "px; ";
    winStyling += "top:" + (helpSpacer).toString() + "px;";
    winStyling += "width: " + readoutWindowWidth + "px; height: " + readoutWindowHeight + "px; user-select: none; font-size: 22px; ";
    winStyling += "background: tan; text-align: center; ";
    readoutWindow = createWin(overlay, winPendingId, "div", winStyling);

    //Day Window
    winPendingId = "day";
    winStyling = "position: absolute; border: 3px solid darkslategray; border-radius: 4px; z-index: 5; left: " + (courtesySpacer * 0.2) + "px; ";
    winStyling += "top:" + (daySpacer).toString() + "px;";
    winStyling += "width: " + readoutWindowWidth + "px; height: " + dayWindowHeight + "px; user-select: none; font-size: 36px; ";
    winStyling += "background: " + dayWindowColors[0] + "; text-align: center; padding-top: " + dayPads + "px; color: darkgoldenrod; ";
    dayWindow = createWin(overlay, winPendingId, "div", winStyling);
    dayWindow.addEventListener("mouseover", summaryIn);
    dayWindow.addEventListener("mouseout", summaryOut);

    //Day Tally Display Window
    winPendingId = "day2";
    winStyling = "position: absolute; border: none; border-radius: none; z-index: 5; left: 0px; top: 0px;";
    winStyling += "width: " + ((readoutWindowWidth / 7) * 4) + "px; height: " + dayWindowHeight + "px; user-select: none; font-size: 36px; ";
    winStyling += "background: none; text-align: center; padding-top: " + dayPads + "px; color: darkgoldenrod; ";
    dayWindowMsg = createWin(dayWindow, winPendingId, "div", winStyling);

    //Pending Stat Task Icon Display Window
    winPendingId = "day3";
    winStyling = "position: absolute; border: none; border-radius: none; z-index: 5; left: " + ((readoutWindowWidth / 7) * 4) + "px; top: 0px;";
    winStyling += "width: " + ((readoutWindowWidth / 7) * 3) + "px; height: " + dayWindowHeight + "px; user-select: none; font-size: 36px; ";
    winStyling += "background: none; text-align: center; padding-top: " + dayPads + "px; color: darkgoldenrod; ";
    dayWindowImg = createWin(dayWindow, winPendingId, "canvas", winStyling);

    //Resc Window
    winPendingId = "resc";
    winStyling = "position: absolute; border: 2px solid darkslategray; border-radius: 4px; z-index: 5; margin-left: " + leftSpacer + "px; ";
    winStyling += "top: " + (rescSpacer).toString() + "px;";
    winStyling += "width: " + spaceWidth + "px; height: " + rescWindowHeight + "px; user-select: none; font-size: 16px; ";
    winStyling += "background: slategray; text-align: center; ";
    rescWindow = createWin(iBox, winPendingId, "div", winStyling);

    //Threat Window
    winPendingId = "threat";
    winStyling = "position: absolute; border: 2px solid red; border-radius: 4px; z-index: 5; margin-left: " + leftSpacer + "px; ";
    winStyling += "top: " + (courtesySpacer * 1.5).toString() + "px;";
    winStyling += "width: " + spaceWidth + "px; height: " + threatWindowHeightMod + "px; user-select: none; font-size: 28px; ";
    winStyling += "background: darkred; text-align: center; padding-top: " + threatPads + "px; color: black; ";
    threatWindow = createWin(iBox, winPendingId, "div", winStyling);

    //Progress Window
    winPendingId = "progress";
    winStyling = "position: absolute; border: 3px solid steelblue; border-radius: 4px; z-index: 5; left: " + (courtesySpacer * 0.2) + "px; ";
    winStyling += "top:" + (courtesySpacer * 0.2).toString() + "px;";
    winStyling += "width: " + readoutWindowWidth + "px; height: " + (threatWindowHeight - (progressPads)) + "px; user-select: none; font-size: 58px; ";
    winStyling += "background: deepskyblue; text-align: center; padding-top: " + progressPads + "px; color: white; ";
    progressWindow = createWin(overlay, winPendingId, "div", winStyling);

    //Task Window
    winPendingId = "task";
    winStyling = "position: absolute; border: 3px solid darkolivegreen; border-radius: 4px; z-index: 5; left: " + rightSpacer.toString() + "px; ";
    winStyling += "top:" + (taskSpacer).toString() + "px;";
    winStyling += "width: " + taskWindowWidth + "px; height: " + (taskWindowHeight) + "px; user-select: none; font-size: 36px; ";
    winStyling += "background: olive; text-align: center; color: black; ";
    taskWindow = createWin(overlay, winPendingId, "div", winStyling);

    //Power Window
    winPendingId = "powerBar";
    winStyling = "position: absolute; border: 3px solid yellowgreen; border-radius: 4px; z-index: 5; left: " + rightSpacer.toString() + "px; ";
    winStyling += "top:" + (courtesySpacer * 0.2).toString() + "px;";
    winStyling += "width: " + taskWindowWidth + "px; height: " + (threatWindowHeight) + "px; user-select: none; font-size: 58px; ";
    winStyling += "background: darkseagreen; text-align: center; color: black; margin: 0px;";
    powerWindow = createWin(overlay, winPendingId, "div", winStyling);

    //Space Window
    let disco = document.getElementById("desc-box");
    winStyling = discoSpacer.toString() + "px";
    styleWin(disco, winStyling, "top");

    //Resc Categories
    let num = 0;
    let rBorders = ["dimgray", "darkolivegreen", "midnightblue", "brown", "darkgoldenrod", "purple"];
    let rBackgrounds = ["darkgray", "darkseagreen", "cadetblue", "rosybrown", "gold", "mediumpurple"];
    for (let i = 0; i < (totalResc / 2); i++) {
        let platePad = 5;
        let hSpacer = 10;
        let wSpacer = 40;
        let plateH = 30 - platePad;
        let plateW = 90;
        let x = 0;
        let y = 0;
        for (let i2 = 0; i2 < (totalResc / 3); i2++) {
            x = ((i + 0.5) * wSpacer) + (i * plateW);
            if (i == 0 && i2 == 0) x += 1;
            y = ((i2 + 1) * hSpacer) + (i2 * (plateH + platePad));
            //Nameplate for Resource
            winPendingId = "tracker" + num.toString();
            winStyling = "z-index: 6; user-select: none; color: black; text-align: center; position: absolute; ";
            winStyling += "padding-top: " + platePad + "px; ";
            winStyling += "left: " + x + "px; ";
            winStyling += "top: " + y + "px; ";
            winStyling += "width: " + plateW + "px; ";
            winStyling += "height: " + plateH + "px; ";
            winStyling += "border: 3px solid " + rBorders[num] + "; ";
            winStyling += "background: " + rBackgrounds[num] + "; ";
            let newPlate = createWin(rescWindow, winPendingId, "div", winStyling);
            newPlate.innerText = rs[num];
            num += 1;
        }

    }

    //Power Buttons
    for (let i = 0; i < powers; i++) {
        let x = ((i + 1) * pbGaps) + (i * pbSize);
        let y = pbH;
        let th = 18;

        //Button Divs
        winPendingId = "power" + i.toString();
        winStyling = "width: " + pbSize + "px; height: " + pbSize + "px; position: absolute; z-index: 5; border-radius: 5px; top: " + y + "px; left: " + x + "px; ";
        winStyling += "background: " + popupColorsOff[4] + "; border: 3px solid black; "
        let newPB = createWin(powerWindow, winPendingId, "div", winStyling);
        newPB.addEventListener("mouseover", pwrIn);
        newPB.addEventListener("mouseout", pwrOut);
        newPB.addEventListener("click", pressPower);

        //Nameplate for Each Button
        winPendingId = "pwr" + i.toString();
        winStyling = "width: " + pbSize + "px; height: " + (th + 2) + "px; position: absolute; z-index: 6; border-radius: 5px; font-size: " + th + "px; ";
        let newPlate = createWin(newPB, winPendingId, "div", winStyling);
        newPlate.innerText = powerButtonText(true, i, false);

        //Canvas for Each Button
        winPendingId = "icon" + i.toString();
        winStyling = "width: " + pbSize + "px; height: " + pbSize + "px; position: absolute; z-index: 6; border-radius: 5px; left: -1px;";
        let newCan = createWin(newPB, winPendingId, "canvas", winStyling);
    }
}

//Provides the Player with Starting Resources
function giveStartingRes() {
    for (let i = 0; i < totalResc; i++) {
        resources[i] = startingRes;
    }
    resources[progressPoint] = 0;
}

//Queues the Starting Popups
function startingPops() {
    let pops = [];
    let d = "\n";
    let dd = d + d;
    let m = -1;
    let header = "Welcome to Star Voyager!";
    let header2 = dd + d;
    let header3 = dd;
    let footer = d;
    let credit = d + "(Created by Alex H.)";
    let taskPoolRef = abilityScores * (totalResc + 1);

    //Message #1
    m += 1;
    pops[m] = "You are the A.I. of a new ship tasked with colonizing planets across the galaxy. ";
    pops[m] += d + " Your primary functions are as follows:";
    pops[m] += dd + d + "1. Delegate daily tasks to a crew of " + totalCrew + " explorers.";
    pops[m] += dd + "2. Ensure you always have at least 1 unit of each critical RESOURCE.";
    pops[m] += dd + "3. Reach 100% PROGRESS towards your destination." + dd;

    //Message #2
    m += 1;
    pops[m] = d + "You WIN when you gain 100% PROGRESS towards your goal.";
    pops[m] += dd + "You are managing " + totalResc + " RESOURCES: ";
    for (let i = 0; i < totalResc; i++) {
        if (i != 0) pops[m] += ", ";
        if (i == totalResc - 1) pops[m] += "and ";
        pops[m] += rsc(i);
    }
    pops[m] += "." + d + "You LOSE if your amount of any RESOURCE reaches 0." + dd;
    pops[m] += "Each member of your crew has " + abilityScores + " stats: ";
    for (let i = 0; i < abilityScores; i++) {
        if (i != 0) pops[m] += ", ";
        if (i == abilityScores - 1) pops[m] += "and ";
        pops[m] += statNames[i];
    }
    pops[m] += "." + dd + "You can view a crewman's stats by hovering over their icon at the bottom of the page." + d;
    pops[m] += "Stats cannot be viewed while an alert window (like this one) is active." + d;

    //Message #3
    m += 1;
    pops[m] = "You assign " + dailyTasks + " task to a crewman each day." + d;
    pops[m] += "The effectiveness of a task is based on one of the assigned crewman's stats." + dd;
    pops[m] += "Icons to a crewman's left show if they have the highest of a stat on the crew." + d;
    pops[m] += "An icon to a crewman's right shows if they have the highest stat for the day's task." + dd;
    pops[m] += "Completing a task rewards PROGRESS or a RESOURCE." + d;
    pops[m] += "When a crewman completes a task, the stat they used increases by " + useStatBoost + "." + dd;
    pops[m] += "You will only have " + (totalCrew - stasisPersons) + " of your " + totalCrew + " crew available at a time." + d;
    pops[m] += "After completing a task, a crewman is replaced by one of the " + stasisPersons + " crewmen in stasis.";

    //Message #4
    m += 1;
    pops[m] = d + "Each crewman begins the game with a combined total of 8 stats." + d;
    pops[m] += "Each crewman's stats are distributed randomly." + d;
    pops[m] += "A crewman will have a minimum of 1 in each stat." + dd + dd;
    pops[m] += "Hovering over the number of days will reveal a crew summary." + d;
    pops[m] += "This shows overall stats for the crew and the size of the task pool." + dd;

    //Message #5
    m += 1;
    pops[m] = d + "There are " + (taskPoolRef) + " different tasks available." + d;
    pops[m] += "Tasks appear in sets of " + abilityScores + "." + dd;
    pops[m] += "Each set of tasks includes a task using each of the " + abilityScores + " stats." + d;
    pops[m] += "Icons will appear beside the number of days traveled to indicate which" + d + "stats remain in the current set." + dd;
    pops[m] += "Every stat has one task that gains each RESOURCE and one task gaining PROGRESS." + d;
    pops[m] += "All " + taskPoolRef + " tasks must be complete before a specific task will appear again." + d;

    //Message #6
    m += 1;
    pops[m] = "When you begin your journey, you will learn of a THREAT that is " + threatDay + " days away." + d;
    pops[m] += "Each THREAT costs your ship increasing amounts of " + threatTargets + " different resources to start its day." + d;
    pops[m] += "After the THREAT ends, you will learn of a new THREAT that is " + threatDay + " days away." + dd + d;
    pops[m] += "You have " + powers + " PROGRAMS you can run at any time." + d;
    pops[m] += "Each PROGRAM provides a powerful benefit, but can only be used once." + dd + d;
    pops[m] += "Hovering over a PROGRAM's icon will display its effects." + d;
    pops[m] += "A PROGRAM's effects will not display while an alert window (like this one) is active.";

    //Message #7
    m += 1;
    pops[m] = dd + d + "The rest, you will learn as you go." + dd;
    pops[m] += "Your crew is counting on you." + dd + "Good luck!" + dd + d;

    //Queue Messages
    let popsGiven = m + 1;
    for (let i = 0; i < popsGiven; i++) {
        if (i == 0) {
            pops[i] = header + credit + header2 + pops[i];
        } else {
            let pageNum = d + "(End of Tutorial)";
            if (i != m) pageNum = d + "(Tutorial: " + (i) + " / " + (m - 1) + ")";
            pops[i] = header + pageNum + header3 + pops[i] + footer;
        }
        popupQueue(pops[i], 0);
    }
}

//Initializes Usable Powers
function initializePowers() {
    for (let i = 0; i < powers; i++) {
        powerUsed[i] = false;
    }
}

//Defines Initial Selectable Colors
function makeSelectableColors() {
    for (let i = 0; i < totalCrew; i++) {
        selectableColors[i] = colorBoxStates[0];
    }
}

//Generates All Crew Members Used
function makeAllCrew() {
    namePoolM = nameList(true, false);
    namePoolF = nameList(false, false);
    namesM = nameList(true, true);
    namesF = nameList(false, true);
    for (let i = 0; i < totalCrew; i++) {
        if (i < activeCrewTotal) {
            makeCrew(true);
        } else {
            makeCrew(false);
            stasisRelease[(totalCrew - activeCrewTotal) - (totalCrew - (i + 1)) - 1] = crewmenList[i];
        }
    }
    //stasisRelease = [crewmenList[activeCrewTotal], crewmenList[activeCrewTotal + 1], crewmenList[activeCrewTotal + 2]];
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Crew Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Makes an Individual Crewman
function makeCrew(activity) {
    let maxShirts = 11;
    let maxSkins = 4;
    let maxHairs = 6;

    //Set Aesthetics
    let rng = Math.floor(Math.random() * maxShirts); //Shirt Color
    let rng2 = Math.floor(Math.random() * maxHairs); //Hair Color
    let rng3 = Math.floor(Math.random() * maxSkins); //Skin Color
    let rng4 = Math.floor(Math.random() * 2);
    let rng5 = 0;
    let name = ""

    if (rng4 == 0) {
        rng5 = Math.floor(Math.random() * namesM);
        name = namePoolM[rng5];
        namePoolM[rng5] = namePoolM[namesM - 1];
        namesM -= 1;
    } else {
        rng5 = Math.floor(Math.random() * namesF);
        name = namePoolF[rng5];
        namePoolF[rng5] = namePoolF[namesF - 1];
        namesF -= 1;
    }

    //Easteggs
    if (name == "Liliana") {
        rng2 = 3; //Hair - Pink
    } else if (name == "Keshia") {
        rng = 1; //Shirt -- Purple
        rng2 = 5; //Hair -- Red
    } else if (name == "Preston") {
        rng = 5; //Shirt -- Yellow
        rng2 = 1; //Hair -- goldenrod
    } else if (name == "Alex") {
        if (rng == 1) rng = 7; //Shirt -- Replaces Yellow with ForestGreen
        if (rng2 == 3) rng2 = 1; //Hair -- Replaces Pink with Goldenrod
    } else if (name == "Julie") {
        rng2 = 0; //Hair -- Black
    } 

    //Define New Crewman
    let newCrew = { "shirt": rng, "hair": rng2, "skin": rng3, "id": crewmen, "active": activity, "sex": rng4, "name": name, "stats": makeStats(name) };
    crewmenList[crewmen] = newCrew;
    crewmen += 1;
}

//Assigns an Array of Stats for a New Creman
function makeStats(name) {
    let bonusStats = 4;
    let assigning = 4;
    let unassigned = 4;
    let viable = [1, 1, 1, 1];
    for (let i = 0; i < bonusStats; i++) {
        let rng = Math.floor(Math.random() * abilityScores);
        viable[rng] += 1;
    }
    let result = [];
    for (let i = 0; i < assigning; i++) {
        let rng = Math.floor(Math.random() * unassigned);
        result[i] = viable[rng];
        viable[rng] = viable[unassigned - 1];
        unassigned -= 1;
    }
    return result;
}

//Boosts a Stat for a Crewman
function boostStat(id, stat, amount) {
    crewmenList[id].stats[stat] += amount;
}

//Deactivates Used Crewman, Activates Next Crewman in Stasis, & Primes the Waiting Crewmen in Stasis for Next Release
function unlockStasis(used) {
    crewmenList[used].active = false;
    stasisRelease[0].active = true;
    for (let i = 0; i < stasisPersons; i++) {
        if (i != stasisPersons - 1) {
            stasisRelease[i] = stasisRelease[i + 1];
        } else {
            stasisRelease[2] = crewmenList[used];
        }
    }
}

//Highlights a Selectable Area
function highlight() {
    let box = document.getElementById(this.id);
    let box2 = document.getElementById(pullElem(pullId(this.id), 1));
    let id = parseInt(pullId(this.id));
    //Color
    if (crewmenList[id - 1].active == true) {
        setColorState(id - 1, 1);
    } else {
        if (stasisChange) setColorState(id - 1, 3);
    }
    //Info
    if (canSelectCrew && canUpdateHelp) showCrewStats(id - 1);
}

//Un-Highlights a Selectable Area
function denounce() {
    let box = document.getElementById(this.id);
    let box2 = document.getElementById(pullElem(pullId(this.id), 1));
    let id = parseInt(pullId(this.id));
    //Color
    if (crewmenList[id - 1].active == true) {
        setColorState(id - 1, 0);
    } else {
        if (stasisChange) setColorState(id - 1, 2);
    }
    //Info
    if (canSelectCrew && canUpdateHelp) showCrewStats(-1);
}

//Highlights the Crew Summary
function summaryIn() {
    let box = document.getElementById(this.id);
    if (canSelectCrew && canUpdateHelp && eventMsgs <= 0) box.style["background-color"] = dayWindowColors[1];
    //Info
    if (canSelectCrew && canUpdateHelp && eventMsgs <= 0) showCrewSummary(0);
}

//Un-Highlights the Crew Summary
function summaryOut() {
    let box = document.getElementById(this.id);
    if (canSelectCrew && canUpdateHelp && eventMsgs <= 0) box.style["background-color"] = dayWindowColors[0];
    //Info
    if (canSelectCrew && canUpdateHelp && eventMsgs <= 0) showCrewSummary(-1);
}

//Alters the ReadoutWindow to Display Crew Summary
function showCrewSummary(id) {
    let helper = readoutWindow;
    if (id == -1) {
        helper.innerText = "";
    } else {
        //let result = "Crew Summary:\n\n";
        let result = "";
        let poolTasks = eventsQueued;

        //Add Task Pool Summary
        for (let i = 0; i < abilityScores; i++) {
            poolTasks += events[i];
        }
        result += "Tasks in Pool: " + poolTasks + "\n\n";

        result += "Crew Stat Totals:\n";
        //Add Crew Stat Summaries
        for (let i = 0; i < abilityScores; i++) {
            result += "" + statNames[i] + ": " + crewJoinedStat(i) + "\n";
        }
        helper.innerText = result;
    }
}

//Alters the ReadoutWindow to Display Stats
function showCrewStats(id) {
    let helper = readoutWindow;
    if (id == -1) {
        helper.innerText = "";
    } else {
        let focus = crewmenList[id];
        //let result = focus.name + ":\n" + sexes[focus.sex] + ", ";
        let result = focus.name + ":\n";
        if (focus.active) {
            result += "Active Duty";
        } else {
            result += "Inactive Stasis";
        }
        result += "\n";
        for (let i = 0; i < abilityScores; i++) {
            result += "\n";
            result += statNames[i];
            result += ": ";
            result += focus.stats[i];
        }
        helper.innerText = result;
    }
}

//Pulls a Selectable's Id to Return a Crewman's Index
function pullId(ides) {
    let id = ides.toString();
    let needToInc = false;
    //Checks for "crew" to convert
    let checker = id.substr(0, 4);
    if (checker == "crew") {
        id = id.replace("crew", "person");
    } else {
        //Checks for "tracker" to convert
        checker = id.substr(0, 7);
        if (checker == "tracker") {
            id = id.replace("tracker", "person");
            needToInc = true;
        } else {
            checker = id.substr(0, 5);
            if (checker == "power") {
                id = id.replace("power", "person");
                needToInc = true;
            }
        }
    }
    var num = parseInt(id.substr(6, 6));
    if (needToInc) num += 1;
    return num;
}

//Pulls the UI Element by Index ID -- Used to Identify Crewman Used
function pullElem(id, layer) {
    let result = "";
    if (layer == 0) {
        result = "person" + id;
    } else {
        result = "crew" + id;
    }
    return result;
}

//Updates Selectable Box Colors in Crew Section
function updateSelectableBoxes() {
    //Crew
    for (let i = 0; i < totalCrew; i++) {
        let box = document.getElementById(pullElem(i + 1, 1));
        let box2 = document.getElementById(pullElem(i + 1, 0));

        //Color
        if (selectableColors[i] == colorBoxStates[0] && crewmenList[i].active == false) {
            selectableColors[i] = colorBoxStates[2]; //Inactive Unelected
        } else if (selectableColors[i] == colorBoxStates[2] && crewmenList[i].active == true) {
            selectableColors[i] = colorBoxStates[0]; //Active Unselected
        } else if (selectableColors[i] == colorBoxStates[1] && crewmenList[i].active == false && stasisChange) {
            selectableColors[i] = colorBoxStates[3]; //Inactive Selected
        } else if (selectableColors[i] == colorBoxStates[3] && crewmenList[i].active == true && stasisChange) {
            selectableColors[i] = colorBoxStates[1]; //Active Selected
        }

        //Unclickable Color
        if (canSelectCrew == false && (selectableColors[i] == colorBoxStates[1] || selectableColors[i] == colorBoxStates[3])) {
            if (crewmenList[i].active == true) {
                selectableColors[i] = colorBoxStates[0];
            } else {
                selectableColors[i] = colorBoxStates[2];
            }
        }

        //Opacity
        if (crewmenList[i].active == false) {
            box2.style["opacity"] = "0.8";
        } else {
            box2.style["opacity"] = "1";
        }

        //Alternate Colors Showing How Soon an Inactive Crewman is Released
        let altColorsList = ["darkgoldenrod", "mediumvioletred", "darkred"];
        let altColorsList2 = ["palegoldenrod", "lightsalmon", "indianred"];
        let altColors = 3;
        let altUsed = -1;
        if (stasisShown == true && crewmenList[i].active == false) {
            for (let i2 = 0; i2 < altColors; i2++) {
                if (crewmenList[i] == stasisRelease[i2]) {
                    if (selectableColors[i] == colorBoxStates[2]) altUsed = altColorsList[i2];
                    if (selectableColors[i] == colorBoxStates[3]) altUsed = altColorsList2[i2];
                }
            }
        }

        //Final
        if (altUsed == -1 || stasisShown == false) {
            box.style["background-color"] = selectableColors[i];
        } else {
            box.style["background-color"] = altUsed;
        }
    }

    //Powers
    for (let i = 0; i < totalCrew; i++) {
        let box = document.getElementById("power" + i.toString());
        if (powerUsed[i] == false && canSelectCrew == false) {
            box.style["background-color"] = popupColorsOff[4];
        }
    }

    //Crew Summary
    if (canSelectCrew == false || canUpdateHelp == false) {
        dayWindow.style["background-color"] = dayWindowColors[0];
    }
}

//Sets a Color State for a Selectable Box
function setColorState(id, state) {
    selectableColors[id] = colorBoxStates[state];
}

//Draws the Entire Crew
function drawCrew() {
    let scope = crewBoxSize / pixes;
    let backing = crewGrid / 2;
    let locale = ((scope / 2) - backing) * pixes;
    let startX = locale;
    let startY = locale;
    for (let i = 0; i < crewmen; i++) {
        let zoneX = startX * 2.25;
        let zoneY = startY;
        let personId = "person" + (i + 1);
        let person = document.getElementById(personId);
        let region = person.getContext("2d");
        drawCrewman(crewmenList[i], region, zoneX, zoneY, cycleCrew);
    }
}

//Draws an Individual Crewman
function drawCrewman(crew, region, spotX, spotY, cycle) {
    region.clearRect(0, 0, board.width, board.height);

    //Original Globals
    let crewColorClothes = ["deepskyblue", "rebeccapurple", "darkolivegreen", "orangered", "yellowgreen", "yellow", "gold", "forestgreen", "green", "dimgray", "slategray"];
    let crewColorSkin = ["saddlebrown", "tan", "sandybrown", "navajowhite"];
    let crewColorHair = ["black", "goldenrod", "whitesmoke", "lightpink", "orangered", "red"];

    //Local Variables
    let localPixes = pixes * 4;
    let hc = crewColorHair[crew.hair]; //hair color
    let sc = crewColorSkin[crew.skin]; //skin color
    let cc = crewColorClothes[crew.shirt]; //clothes color
    let nc = "none"; //no color
    let bc = "brown"; //boot color
    let ac = nc; //alternate color
    let ac2 = sc; //alternate color
    let gc = nc; //longer hair
    let gc2 = sc; //longer hair
    let gc3 = cc; //longer hair
    let miniCycle = cycle;

    //Stationary crewman if in stasis (inactive)
    if (crew.active == false) {
        miniCycle = 0;
        //box.style["background"] = "darkred";
        drawCapsule(region);
    } else {
        //box.style["background"] = "mediumslateblue";
    }

    if (miniCycle == 1) ac = sc;
    if (miniCycle == 1) ac2 = nc;
    if (crew.sex == 1) gc = hc;
    if (crew.sex == 1) gc2 = hc;
    if (crew.sex == 1) gc3 = hc;
    let crewLook = [];
    crewLook[0] = [nc, nc, hc, hc, nc, nc];
    crewLook[1] = [nc, nc, gc2, sc, nc, nc];
    crewLook[2] = [ac, cc, gc3, cc, cc, ac];
    crewLook[3] = [nc, ac2, cc, cc, ac2, nc];
    crewLook[4] = [nc, nc, cc, cc, nc, nc];
    crewLook[5] = [nc, nc, bc, bc, nc, nc];

    //Draw Crewman Body
    for (let i = 0; i < crewGrid; i++) {
        for (let i2 = 0; i2 < crewGrid; i2++) {
            if (crewLook[i2][i] != nc) {
                region.fillStyle = crewLook[i2][i];
                let x = spotX + (i * localPixes);
                let y = spotY + (i2 * localPixes);
                region.fillRect(x, y, localPixes, localPixes);
            }
        }
    }

    //Draw Crewman Awards
    let awards = [];
    let awarded = 0;
    let drawCrown = false;
    let stasisKnown = -1;
    for (let i = 0; i < abilityScores; i++) {
        let testStat = crew.stats[i];
        if (testStat >= findHighestStat(i)) {
            if (i == event.stat) {
                drawCrown = true;
            }
            awards[awarded] = i;
            awarded += 1;
        }
    }

    //Crown + Stasis
    if (crew.active == false && displayStasis == true) {
        for (let i = 0; i < stasisPersons; i++) {
            if (crew == stasisRelease[i]) stasisKnown = i;
        }
    }
    if (awarded > 0 || stasisKnown > -1) drawAwards(awards, awarded, region, spotY - localPixes, drawCrown, stasisKnown);
}

//Draws a Capsule Behind a Crewman
function drawCapsule(region) {

    let capGrid = 8;
    let scope = crewBoxSize / pixes;
    let backing = capGrid / 2;
    let locale = ((scope / 2) - backing) * pixes;
    let spotX = locale;
    let spotY = locale;

    let localPixes = pixes * 4;
    let wc = "darkslategray"; //side color
    let ic = "powderblue"; //interior color
    let nc = "none"; //no color
    let capLook = [];
    capLook[0] = [nc, wc, wc, wc, wc, wc, wc, nc];
    capLook[1] = [nc, wc, ic, ic, ic, ic, wc, nc];
    capLook[2] = [nc, wc, ic, ic, ic, ic, wc, nc];
    capLook[3] = [nc, wc, ic, ic, ic, ic, wc, nc];
    capLook[4] = [nc, wc, ic, ic, ic, ic, wc, nc];
    capLook[5] = [nc, wc, ic, ic, ic, ic, wc, nc];
    capLook[6] = [nc, wc, ic, ic, ic, ic, wc, nc];
    capLook[7] = [nc, wc, wc, wc, wc, wc, wc, nc];

    //Draw Generic Capsule
    for (let i = 0; i < capGrid; i++) {
        for (let i2 = 0; i2 < capGrid; i2++) {
            if (capLook[i2][i] != nc) {
                region.fillStyle = capLook[i2][i];
                let x = (spotX * 2.15) + (i * localPixes);
                let y = (spotY * 0.82) + (i2 * localPixes);
                region.fillRect(x, y, localPixes, localPixes);
            }
        }
    }
}

//Returns Index # for a Crewman Location
function crewSpot(x, y) {
    let result = (x * crewGrid) + y;
    return result;
}

//Returns Names for a List Randomly Assigned to Crewmen
function nameList(male, tallyOnly) {
    if (tallyOnly == true) {
        if (male == true) {
            return 7;
        } else {
            return 6;
        }
    }
    if (male == true) {
        return ["Alex", "Preston", "Daniel", "Sam", "Chance", "Steven", "Josh"];
    } else {
        return ["Liliana", "Alaina", "Julie", "Haley", "Keshia", "Molly"];
    }
}

//Gets Highest Value of a Stat for the Crew
function findHighestStat(stat) {
    let result = crewmenList[0].stats[stat];
    for (let i = 1; i < totalCrew; i++) {
        let contender = crewmenList[i].stats[stat];
        if (contender > result) {
            result = contender;
        }
    }
    return result;
}

//Draws Images for a Crewman's Awards
function drawAwards(awards, awarded, region, spotY, crowned, stasisKnown) {
    let localPixes = pixes * 1;
    let aSize = localPixes * awardGrid;
    let aSpacing = 3;
    let scope = crewBoxSize / localPixes;
    let backing = aSize / 2;
    //let locale = ((scope / 2) - (backing + (aSpacing * (awarded + 1)))) * localPixes;
    let locale = ((scope / 2) - backing) * localPixes;
    let startX = locale;
    let startY = spotY;
    if (awarded > 0) {
        for (let i = 0; i < awarded; i++) {
            let zoneX = startX;
            let zoneY = startY;
            //let iconId = "person" + (i + 1).toString();
            drawAward(awards[i], region, zoneX, zoneY + ((aSize + aSpacing) * i), localPixes);
        }
    }

    //Drawing Stasis
    if (stasisKnown > -1) {
        let zoneX = (startX * 2) + (4 * pixes * crewGrid * 2) + locale;
        let zoneY = startY;
        let stasisPos = abilityScores + stasisKnown + 1;
        drawAward(stasisPos, region, zoneX, zoneY, localPixes);
    }

    //Drawing Crown
    if (crowned) {
        let zoneX = (startX * 2) + (4 * pixes * crewGrid * 2) + locale;
        let zoneY = startY;
        if (stasisKnown > -1) zoneY += (aSize + aSpacing);
        drawAward(abilityScores, region, zoneX, zoneY, localPixes);
    }
}

//Draws an Image for a Crewman's Inidivudal Award
function drawAward(id, region, spotX, spotY, localPixes) {

    let localPixes2 = localPixes * 1.85;
    let nc = "none"; //no color

    let look = awardDetails(id);

    //Draw Icon
    for (let i = 0; i < awardGrid; i++) {
        for (let i2 = 0; i2 < awardGrid; i2++) {
            if (look[i2][i] != nc) {
                region.fillStyle = look[i2][i];
                let x = spotX + (i * localPixes2);
                let y = spotY + (i2 * localPixes);
                region.fillRect(x, y, localPixes2, localPixes);
            }
        }
    }
}

//Returns Drawn Award Details
function awardDetails(id) {
    let look = [];
    let nc = "none"; //no color
    let bd = "black";

    let pc = nc;
    let ac = nc;
    //let sc = nc;

    if (id == 0) { //CHA
        pc = "yellow";
        ac = "rebeccapurple";
        look[1] = [bd, ac, pc, pc, pc, ac, bd];
        look[2] = [bd, ac, pc, ac, ac, ac, bd];
        look[3] = [bd, ac, pc, ac, ac, ac, bd];
        look[4] = [bd, ac, pc, ac, ac, ac, bd];
        look[5] = [bd, ac, pc, pc, pc, ac, bd];
    } else if (id == 1) { //INT
        pc = "yellowgreen";
        ac = "hotpink";
        look[1] = [bd, ac, pc, pc, pc, ac, bd];
        look[2] = [bd, ac, ac, pc, ac, ac, bd];
        look[3] = [bd, ac, ac, pc, ac, ac, bd];
        look[4] = [bd, ac, ac, pc, ac, ac, bd];
        look[5] = [bd, ac, pc, pc, pc, ac, bd];
    } else if (id == 2) { //PER
        pc = "darkgoldenrod";
        ac = "blue";
        look[1] = [bd, ac, pc, pc, pc, ac, bd];
        look[2] = [bd, ac, pc, ac, pc, ac, bd];
        look[3] = [bd, ac, pc, pc, pc, ac, bd];
        look[4] = [bd, ac, pc, ac, ac, ac, bd];
        look[5] = [bd, ac, pc, ac, ac, ac, bd];
    } else if (id == 3) { //STR
        pc = "lightgray";
        ac = "brown";
        look[1] = [bd, ac, pc, pc, pc, ac, bd];
        look[2] = [bd, ac, pc, ac, ac, ac, bd];
        look[3] = [bd, ac, pc, pc, pc, ac, bd];
        look[4] = [bd, ac, ac, ac, pc, ac, bd];
        look[5] = [bd, ac, pc, pc, pc, ac, bd];
    } else if (id == 4) { //Crown
        pc = "orange";
        ac = "lightyellow";
        look[1] = [bd, ac, ac, ac, ac, ac, bd];
        look[2] = [bd, ac, ac, pc, ac, ac, bd];
        look[3] = [bd, pc, ac, pc, ac, pc, bd];
        look[4] = [bd, pc, pc, pc, pc, pc, bd];
        look[5] = [bd, ac, ac, ac, ac, ac, bd];
    } else if (id == 5) { //#1
        pc = "black";
        ac = "deepskyblue";
        look[1] = [bd, ac, ac, pc, ac, ac, bd];
        look[2] = [bd, ac, pc, pc, ac, ac, bd];
        look[3] = [bd, ac, ac, pc, ac, ac, bd];
        look[4] = [bd, ac, ac, pc, ac, ac, bd];
        look[5] = [bd, ac, pc, pc, pc, ac, bd];
    } else if (id == 6) { //#2
        pc = "black";
        ac = "deepskyblue";
        look[1] = [bd, ac, pc, pc, pc, ac, bd];
        look[2] = [bd, ac, ac, ac, pc, ac, bd];
        look[3] = [bd, ac, pc, pc, pc, ac, bd];
        look[4] = [bd, ac, pc, ac, ac, ac, bd];
        look[5] = [bd, ac, pc, pc, pc, ac, bd];
    } else { //#3
        pc = "black";
        ac = "deepskyblue";
        look[1] = [bd, ac, pc, pc, pc, ac, bd];
        look[2] = [bd, ac, ac, ac, pc, ac, bd];
        look[3] = [bd, ac, pc, pc, pc, ac, bd];
        look[4] = [bd, ac, ac, ac, pc, ac, bd];
        look[5] = [bd, ac, pc, pc, pc, ac, bd];
    }

    //Final Boundaries
    look[0] = [bd, bd, bd, bd, bd, bd, bd];
    /*look[1] = [bd, ac, ac, ac, ac, ac, bd];
    look[awardGrid - 2] = [bd, ac, ac, ac, ac, ac, bd];*/
    look[awardGrid - 1] = [bd, bd, bd, bd, bd, bd, bd];

    //Final
    return look;
}

//Returns the Collective Value of a Stat for the Crew
function crewJoinedStat(id) {
    let result = 0;
    for (let i = 0; i < totalCrew; i++) {
        result += crewmenList[i].stats[id];
    }
    return result;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Power Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Using a Power
function pressPower() {
    let id = parseInt(pullId(this.id)) - 1;
    if (canPressTask && powerUsed[id] == false) {
        let styling = 0;

        //Display Usage
        popupQueue(powerButtonText(false, id, true), 4);

        //Apply Effects
        if (id == 0) {
            styling = day;
            if (event.gain == progressPoint) styling = (Math.floor(styling * 0.1) / 2);
            if (styling <= 1 && event.gain != progressPoint) styling = 1;
            if (styling <= 0 && event.gain == progressPoint) styling = 0.5;
            adjustRes(event.gain, styling, false);
            if (checkGameOver()) {
                makeGameOver();
            }
        } else if (id == 1) {
            styling = Math.floor(day / threatDay) + 1;
            for (let i = 0; i < totalCrew; i++) {
                if (crewmenList[i].active == false) boostStat(i, event.stat, styling);
            }
        } else if (id == 2) {
            styling = day;
            adjustRes(threat.r1, styling, false);
            adjustRes(threat.r2, styling, false);
        } else {
            let high = findHighLow(true);
            let low = findHighLow(false);
            styling = resources[high] - resources[low];
            adjustRes(low, styling, false);
        }

        //Remove Button
        powerUsed[id] = true;
        let box = document.getElementById(this.id);
        box.parentNode.removeChild(box);
    }
}

//Alters the ReadoutWindow to Display Powers
function showPwrInfo(id) {
    let helper = readoutWindow;
    if (id == -1) {
        helper.innerText = "";
    } else {
        let result = powerButtonText(true, id, false) + ":\n\n";
        result += powerButtonText(false, id, false);
        helper.innerText = result;
    }
}

//Highlights a Power
function pwrIn() {
    let box = document.getElementById(this.id);
    let id = parseInt(pullId(this.id) - 1);
    if (canSelectCrew) box.style["background-color"] = popupColorsOn[4];
    //Info
    if (canSelectCrew && canUpdateHelp) showPwrInfo(id);
}

//Un-Highlights a Power
function pwrOut() {
    let box = document.getElementById(this.id);
    let id = parseInt(pullId(this.id) - 1);
    if (canSelectCrew) box.style["background-color"] = popupColorsOff[4];
    //Info
    if (canSelectCrew && canUpdateHelp) showPwrInfo(-1);
}

//Returns Text for a Power's Type
function powerButtonText(name, id, applied) {
    if (name == true) {
        //Return the Power's Name
        if (id == 0) {
            return "Overclock";
        } else if (id == 1) {
            return "Energize";
        } else if (id == 2) {
            return "Lockdown";
        } else {
            return "3D Printing";
        }
    } else {
        //Return the Power's Description
        if (applied == false) {
            //Text for Readout (Helper) Window
            if (id == 0) {
                return "Gain amount of task's RESOURCE equal to number of days traveled.\n 90% reduction when gaining PROGRESS.";
            } else if (id == 1) {
                return "Boosts task's stat for all inactive crew equal to number of threat warnings seen.";
            } else if (id == 2) {
                return "Gain amount of each threatened RESOURCE equal to number of days traveled.";
            } else {
                return "Sets the units of your lowest RESOURCE equal to the amount of units for your highest resource.";
            }
        } else {
            //Text for Popup Window
            let styling = "";
            if (id == 0) {
                styling = day;
                if (event.gain == progressPoint) styling = Math.floor(styling * 0.1);
                if (styling <= 0) styling += 1;
                styling = "Overlocking the ship's core systems gives +" + styling + " " + rsc(event.gain) + "!";
            } else if (id == 1) {
                styling = Math.floor(day / threatDay) + 1;
                styling = "Augmenting crewmen in stasis with bionic upgrades gives each +" + styling + " " + statNames[event.stat] + "!";
            } else if (id == 2) {
                styling = day;
                styling = "Utilizing any raw materials on-hand gains +" + styling + " " + rsc(threat.r1) + " and +" + styling + " " + rsc(threat.r2) + "!";
            } else {
                let high = findHighLow(true);
                let low = findHighLow(false);
                styling = resources[high] - resources[low];
                styling = "Exhausting your printing stock gives you +" + styling + " " + rsc(low) + "!";
            }
            styling = powerButtonText(true, id, false) + "\n\n" + styling;
            return styling;
        }
    }
}

//Returns Drawn Icon Details
function iconDetails(id, cycle) {
    let look = [];
    let nc = "none"; //no color

    let pc = nc;
    let ac = nc;

    if (id == 0) {
        pc = "brown";
        if (cycle == 1) pc = "orangered";
        ac = "gold";
        if (cycle == 1) ac = "goldenrod";
        look[0] = [pc, nc, pc, pc, nc, pc];
        look[1] = [nc, pc, pc, pc, pc, nc];
        look[2] = [pc, pc, ac, ac, pc, pc];
        look[3] = [pc, pc, ac, ac, pc, pc];
        look[4] = [nc, pc, pc, pc, pc, nc];
        look[5] = [pc, nc, pc, pc, nc, pc];
    } else if (id == 1) {
        pc = "slategray";
        if (cycle == 1) pc = "darkslategray";
        ac = "darkolivegreen";
        if (cycle == 1) ac = "greenyellow";
        look[0] = [nc, pc, pc, pc, pc, nc];
        look[1] = [nc, pc, ac, ac, pc, nc];
        look[2] = [nc, pc, ac, ac, pc, nc];
        look[3] = [nc, pc, ac, ac, pc, nc];
        look[4] = [nc, pc, ac, ac, pc, nc];
        look[5] = [nc, pc, pc, pc, pc, nc];
    } else if (id == 2) {
        pc = "black";
        if (cycle == 1) pc = "slategray";
        ac = "red";
        if (cycle == 1) ac = "darkred";
        look[0] = [pc, pc, pc, pc, pc, pc];
        look[1] = [pc, ac, ac, ac, ac, pc];
        look[2] = [pc, pc, pc, pc, pc, pc];
        look[3] = [pc, ac, ac, ac, ac, pc];
        look[4] = [pc, pc, pc, pc, pc, pc];
        look[5] = [pc, ac, pc, pc, ac, pc];
    } else {
        pc = "brown";
        if (cycle == 1) pc = "saddlebrown";
        ac = "gray";
        if (cycle == 1) ac = "lightgray";
        look[0] = [pc, pc, pc, pc, pc, pc];
        look[1] = [pc, pc, pc, pc, pc, pc];
        look[2] = [nc, pc, nc, nc, pc, pc];
        look[3] = [nc, ac, nc, nc, nc, pc];
        look[4] = [nc, ac, ac, ac, nc, pc];
        look[5] = [pc, pc, pc, pc, pc, pc];
    }

    //Final
    return look;
}

//Draws Icons for All Powers
function drawIcons() {
    let scope = Math.floor(pbSize / pixes);
    let backing = crewGrid / 2;
    let locale = ((scope / 2) - backing) * pixes;
    let startX = locale;
    let startY = locale;
    for (let i = 0; i < powers; i++) {
        if (powerUsed[i] == false) {
            let zoneX = startX * 1.8;
            let zoneY = startY * 1.1;
            let iconId = "icon" + (i).toString();
            let icon = document.getElementById(iconId);
            let region = icon.getContext("2d");
            drawIcon(i, region, zoneX, zoneY, cycleIcon);
        }
    }
}

//Draws an Individual Power's Icon
function drawIcon(id, region, spotX, spotY, cycle) {
    region.clearRect(0, 0, board.width, board.height);
    let localPixes = pixes * 5;
    let localPixes2 = localPixes * 1.85;
    let nc = "none"; //no color

    let look = iconDetails(id, cycle);

    //Draw Icon
    for (let i = 0; i < crewGrid; i++) {
        for (let i2 = 0; i2 < crewGrid; i2++) {
            if (look[i2][i] != nc) {
                region.fillStyle = look[i2][i];
                let x = spotX + (i * localPixes2);
                let y = spotY + (i2 * localPixes);
                region.fillRect(x, y, localPixes2, localPixes);
            }
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Daily Task Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Processes a Day
function dayLife() {

    //Now Checks GameOver Before Creating Additional Tasks and Processing Threats; Originally Incremented Day/Rotation + Threatened first
    if (checkGameOver() == true) {
        makeGameOver();
    } else {

        day += 1;
        statRotation += 1;

        if (day % threatDay == 0 || day < 2) {
            threaten();
        }

        //Check Game Over Again, Accounting for Threat Cost
        if (checkGameOver() == true) {
            makeGameOver();
        } else {
            if (statRotation >= abilityScores) statRotation = 0;
            startTasks();
        }

    }
}

//Selecting a Crewman for a Task
function pressTask() {
    let id = parseInt(pullId(this.id));
    if (canPressTask && crewmenList[id - 1].active == true) {
        canPressTask = false;
        completeTask(id - 1);
    }
}

//Completes a Task
function completeTask(id) {
    let stat = event.stat;
    let value = event.gain;
    boostStat(id, event.stat, useStatBoost);
    stat = crewmenList[id].stats[stat];
    unlockStasis(id);
    adjustRes(value, stat - useStatBoost, true);
}

//Generates a New Task
function startTasks() {
    //Tasking should have a length = daily tasks, typically @ abilityScores #
    let tasksMade = abilityScores;

    if (eventsQueued <= 0) {
        let tasking = [];
        let rTasks = [];
        let cap = 0;
        for (let i = 0; i < abilityScores; i++) {
            tasking[i] = i;
            cap += 1;
        }


        for (let i = 0; i < abilityScores; i++) {
            let rng = Math.floor(Math.random() * cap);
            rTasks[i] = tasking[rng];
            tasking[rng] = tasking[cap - 1];
            cap -= 1;
        }

        //Draft from Pools
        for (let i = 0; i < tasksMade; i++) {
            eventQueue[rTasks[i]] = cycleTask(i);
            eventsQueued += 1;
        }
    }

    //Assign Current Task
    nextTask();
}

//Goes to the Next Task Queued
function nextTask() {
    event = eventQueue[0];
    eventQueue[0] = eventQueue[eventsQueued - 1];
    eventsQueued -= 1;

    //Display the Active Task
    displayTask(0);
}

//Displays the Task
function displayTask(style) {
    let d = "\n";
    let dd = d + d;
    if (style == 0) {
        let header = "DAILY TASK:" + dd;
        let content = event.flavor;
        let value = "Gain " + rsc(event.gain) + " equal to " + statNames[event.stat];
        if (event.gain == progressPoint) value += " x 2";
        value += "!";
        content = header + content + dd + value;
        taskWindow.innerText = content;
    }
}

//Replaces Current Task and Checks to Refresh Pool
function cycleTask(stat) {
    let result;
    //Check to Refresh Pool
    if (events[stat] == 0) makeEventPool(stat);

    //Generate Replacement Threat
    let rng = Math.floor(Math.random() * events[stat]);
    result = eventPool[stat][rng];
    eventPool[stat][rng] = eventPool[stat][events[stat] - 1];
    events[stat] -= 1;
    return result;
}

//Generates Initial Task Pools
function makeEventPool(stat) {
    let limit = abilityScores;
    let generated = [];
    let groups = [];
    let eventsPerStat = 7;
    for (let i = 0; i < limit; i++) {
        generated[i] = 0;
        groups[i] = [];
    }

    //Gather Flavor
    for (let i = 0; i < limit; i++) {
        for (let i2 = 0; i2 < eventsPerStat; i2++) {
            let gained = i2;
            while (gained > progressPoint) {
                gained -= progressPoint;
            }
            groups[i][i2] = { "flavor": genEventFlavor(i2, i), "stat": i, "gain": gained };
            generated[i] += 1;
        }
    }

    //Final Development
    for (let i = 0; i < limit; i++) {
        if (stat == i || stat >= limit) {
            events[i] = generated[i];
            eventPool[i] = [];
            for (let i2 = 0; i2 < generated[i]; i2++) {
                eventPool[i][i2] = groups[i][i2];
            }
        }
    }
}

//Generates Flavor for a Task
function genEventFlavor(id, stat) {
    let flavors = [];
    let a = 0;
    let b = -1;
    for (let i = 0; i < abilityScores; i++) {
        flavors[i] = [];
    }

    //Generate CHA Tasks
    b += 1; flavors[a][b] = "Barter for powerful alien weapons.";
    b += 1; flavors[a][b] = "Provide confidential therapy.";
    b += 1; flavors[a][b] = "Promote energy rationing.";
    b += 1; flavors[a][b] = "Find a trustworthy seller for parts.";
    b += 1; flavors[a][b] = "Give a rousing speech.";
    b += 1; flavors[a][b] = "Act as an alien ambassador.";
    b += 1; flavors[a][b] = "Negotiate use of local warp points.";

    //Generate INT Tasks
    a += 1; b = -1;
    b += 1; flavors[a][b] = "Research weaponry upgrades.";
    b += 1; flavors[a][b] = "Develop new vaccines.";
    b += 1; flavors[a][b] = "Produce synthetic oil.";
    b += 1; flavors[a][b] = "Improve shielding output.";
    b += 1; flavors[a][b] = "Automate additional workloads.";
    b += 1; flavors[a][b] = "Upgrade the universal translator.";
    b += 1; flavors[a][b] = "Calculate new warp points.";

    //Generate PER Tasks
    a += 1; b = -1;
    b += 1; flavors[a][b] = "Calibrate turret sights.";
    b += 1; flavors[a][b] = "Monitor symptoms of illness.";
    b += 1; flavors[a][b] = "Scan for warnings of engine failure.";
    b += 1; flavors[a][b] = "Survey hull damage.";
    b += 1; flavors[a][b] = "Listen for signs of crew unrest.";
    b += 1; flavors[a][b] = "Search for friendly broadcasts.";
    b += 1; flavors[a][b] = "Watch for the creation of new warp points.";

    //Generate STR Tasks
    a += 1; b = -1;
    b += 1; flavors[a][b] = "Recover unspent rounds.";
    b += 1; flavors[a][b] = "Manually clear toxic spill.";
    b += 1; flavors[a][b] = "Replace heavy machinery.";
    b += 1; flavors[a][b] = "Weld external damage.";
    b += 1; flavors[a][b] = "Organize crew-wide sports.";
    b += 1; flavors[a][b] = "Defeat an alien gladiator.";
    b += 1; flavors[a][b] = "Prep cargo for warp travel.";

    return flavors[stat][id];
}

//Updates Info Images for Remaining Tasks
function drawTaskPool() {
    let region = dayWindowImg.getContext("2d");
    let localPixes = pixes * 2;
    let wid = Math.floor((readoutWindowWidth / 7) * 4);
    let hei = dayWindowHeight;
    let spacing = 10;
    let spot = [];
    let spotTally = 0;

    
    //Generate Valid Spots
    for (let i = 0; i < 2; i++) {
        for (let i2 = 0; i2 < 2; i2++) {
            //let x = (spacing * (i + 1)) + ((pixes * awardGrid) * i);
            //let y = (spacing * (i2 + 1)) + ((pixes * awardGrid) * i2);
            let x = spacing * 0.5;
            if (i == 1) x = wid + spacing;
            let y = spacing;
            if (i2 == 1) y = hei + spacing;
            spot[spotTally] = [x, y];
            spotTally += 1;
        }
    }

    //Draw Valid Icons
    spotTally = 0;
    region.clearRect(0, 0, readoutWindowWidth, readoutWindowHeight);
    let drawn = [];
    for (let i = 0; i < abilityScores; i++) drawn[i] = false;
    if (eventsQueued > 0) {
        for (let i = 0; i < abilityScores; i++) {
            if (checkStatPool(i) && drawn[i] == false) {
                drawn[i] = true;
                drawAward(i, region, spot[spotTally][0], spot[spotTally][1], localPixes);
                spotTally += 1;
            }
        }
    }
}

//Determines if a Stat's Task Remains in the Pool
function checkStatPool(id) {
    let result = false;
    if (eventsQueued <= 0) return result;
    for (let i = 0; i < eventsQueued; i++) {
        if (eventQueue[i].stat == id) result = true;
    }
    return result;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Threat Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Applies an Existing Threat and Generates a new One
function threaten() {
    //Conclude Old Threat
    if (threat != 0) {
        popupQueue(threatText(true, 0), 1);
    }

    //Increase Threat Cost
    let mult = Math.floor(day / threatDay);
    mult += 1;
    threatCost = baseThreatCost * mult;

    //New Threat
    if (checkGameOver() == false) cycleThreat();
}

//Replaces Current Threat and Checks to Refresh Pool
function cycleThreat() {
    //Check to Refresh Pool
    if (threats == 0) makeThreatPool();

    //Generate Replacement Threat
    let rng = Math.floor(Math.random() * threats);
    threat = threatPool[rng];
    threatPool[rng] = threatPool[threats - 1];
    threats -= 1;

    //Display New Threat
    threatWindow.innerText = threatText(false, 1);
    popupQueue(threatText(false, 0), 1);
}

//Generates Threat Text
function threatText(penalty, style) {
    let d = "\n";
    let dd = d + d;
    let content = threat.info;
    let reckoning = day + threatDay;
    if (reckoning % threatDay != 0) reckoning -= 1;
    let threatNum = Math.floor(reckoning / threatDay);
    let header = "WARNING:" + d;
    let warner = "INCOMING THREAT:" + dd;
    let banner = "THREAT #" + threatNum + ":";
    let noPenalty = content + dd + "On Day " + reckoning + ", you will lose:";
    let simple = d + "On Day " + reckoning + ", you will lose:";
    let hitsTotal = 2;
    let hits = [threat.r1, threat.r2];

    //General Display
    if (style == 0) {
        content = d + content;
        if (penalty == true) {
            applyThreatPenalty(false);
            content = header + content + dd + "You lose:";
        } else {
            content = warner + noPenalty;
        }

        for (let i = 0; i < hitsTotal; i++) {
            content += d + threatCost + " " + rsc(hits[i]);
        }
    } else {
        content = banner + d + simple + d;
        for (let i = 0; i < hitsTotal; i++) {
            if (i != 0) content += ", ";
            content += threatCost + " " + rsc(hits[i]);
        }
    }

    //Specialized Display

    return content;
}

//Applies the Threat Penalty
function applyThreatPenalty(display) {
    //Reduce Resources
    adjustRes(threat.r1, threatCost * -1, display);
    adjustRes(threat.r2, threatCost * -1, display);

    //Create Animations
    threatBoom();
}

//Creates a Standardized Animation for Threat Application
function threatBoom() {
    let boomsX = (threatCost / 5) + 1; //X Positions Drawn
    let boomsY = (threatCost / 5) + 1; //Y Positions Drawn
    let boomD = 5; //Spacing Between Points
    let boomT = 30; //Timing Variance, Random

    //Assign Points to Queue Booms
    for (let i = 0; i < boomsX; i++) {
        for (let i2 = 0; i2 < boomsY; i2++) {
            //Determine Positive or Negative, then Draw X
            let orientation = (Math.floor(Math.random() * 2));
            if (orientation == 0) {
                orientation = -1;
            } else {
                orientation = 1;
            }
            let x = shipX + (i * boomD * orientation);

            //Determine Positive or Negative, then Draw X
            orientation = (Math.floor(Math.random() * 2));
            if (orientation == 0) {
                orientation = -1;
            } else {
                orientation = 1;
            }
            let y = shipY + (i2 * boomD * orientation);
            let cycle = (Math.floor(Math.random() * boomT) * -1);
            makeBoom(x, y, cycle, context3, 0);
        }
    }
}

//Generates Initial Threat Pool
function makeThreatPool() {
    //Threat Templates
    for (let i = 0; i < totalResc; i++) {
        for (let i2 = 0; i2 < totalResc; i2++) {
            if (i2 > i) {
                let bad = { "r1": i, "r2": i2, "info": "" };
                threatPool[threats] = bad;
                threats += 1;
            }
        }
    }

    //Flavor Text
    let t = -1;
    t += 1;
    threatPool[t].info = "Radiation leaks endanger your turrets and gunners!";
    t += 1;
    threatPool[t].info = "Power cells for your weapons and engines are failing!";
    t += 1;
    threatPool[t].info = "Battery discharge is needed to cross a dense asteroid field!";
    t += 1;
    threatPool[t].info = "Warning shots are used to keep peace aboard the vessel!";
    t += 1;
    threatPool[t].info = "Mishandled munition crates are found loaded empty!";
    t += 1;
    threatPool[t].info = "Toxic fumes from the engine are leaking into living quarters!";
    t += 1;
    threatPool[t].info = "Radiation shields are failing, exposing the crew to cosmic rays!";
    t += 1;
    threatPool[t].info = "Alien pathogens leave the crew weak and irritable!";
    t += 1;
    threatPool[t].info = "A dangerous disease leaves many officers disfigured!";
    t += 1;
    threatPool[t].info = "Hull breaches leak fuel into space!";
    t += 1;
    threatPool[t].info = "Water rations are cut to replenish a hydrogen leak!";
    t += 1;
    threatPool[t].info = "Oil leaks leave unseemly stains across the vessel!";
    t += 1;
    threatPool[t].info = "Use of secondary facilities is restricted due to multiple hull breaches!";
    t += 1;
    threatPool[t].info = "External damage disfigures the ship beyond recognition!";
    t += 1;
    threatPool[t].info = "Diplomatic breakdown destroys the crew's reputation with a nearby fleet!";

}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Popup Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Creates a Priority Window
function makePopup(madePop) {
    //Types = Generic, Warning, Resource, GameOver, Power
    let winStyling = "";
    let content = madePop.msg;
    let popType = madePop.type;
    if (canMakePopup == false) return;
    if (popType != 3) {
        content += "\n\n\n(*Click Here to Continue*)";
    } else {
        content += "\n\n(*Click Here to Play Again*)";
    }

    let baseW = taskWindowWidth * 1.4;
    let baseH = taskWindowHeight * 1.4;
    let typeWs = [baseW, baseW * 0.8, baseW * 0.5, baseW, baseW]; //Widths
    let typeHs = [baseH, baseH * 0.8, baseH * 0.5, baseH, baseH]; //Heights
    let popBs = ["red", "red", "red", "red", "red"]; //Border Colors
    let popFs = [18, 24, 32, 40, 40]; //Font Sizes
    let popFCs = ["black", "black", "black", "black", "gold"]; //Font Colors

    let popW = typeWs[popType]; //Width
    let popH = typeHs[popType]; //Height
    let popT = boardHeight - (((boardHeight - popH) / 2) + popH); //Top
    let popL = (boardWidth - popW) / 2; //Left
    let popB = popBs[popType]; //Border Color
    let popP = popH * 0.04; //Top Padding
    let popC = popupColorsOff[popType]; //Background Color
    let popF = popFs[popType]; //Font Size
    let popFC = popFCs[popType]; //Font Color
    popH -= popP;
    interactive(true);
    //Event Window
    winStyling = "position: absolute; border: 3px solid " + popB + "; border-radius: 4px; z-index: 5; left: " + popL + "px; ";
    winStyling += "top:" + popT + "px;";
    winStyling += "width: " + popW + "px; height: " + (popH) + "px; user-select: none; font-size: " + popF + "px; ";
    winStyling += "background:  " + popC + "; text-align: center; color: " + popFC + "; padding-top: " + popP + "px; ";
    popup = createWin(overlay, "popup", "div", winStyling);
    popup.innerText = content;
    popup.addEventListener("mouseover", popIn);
    popup.addEventListener("mouseout", popOut);
    popup.addEventListener("click", popEnd);
}

//Highlights a Popup
function popIn() {
    let box = document.getElementById(this.id);
    box.style["background-color"] = popupColorsOn[currentPop.type];
}

//Un-Highlights a PopUp
function popOut() {
    let box = document.getElementById(this.id);
    box.style["background-color"] = popupColorsOff[currentPop.type];
}

//Ends a Popup
function popEnd() {
    if (gameOver && currentPop.type == 3) {
        clearGame();
        newGame();
    } else {
        let box = document.getElementById(this.id);
        let taskCompleted = false;
        if (currentPop.type == 2) taskCompleted = true;
        popupNext();
        interactive(false);
        box.parentNode.removeChild(box);
        if (taskCompleted == true) {
            //if (eventsQueued <= 0) {
            if (eventsQueued <= 0 || dailyTasks == 1) {
                dayLife();
            } else {
                nextTask();
            }
        }
    }

}

//Queues a Popup Message
function popupQueue(content, type) {
    let newPopup = { "msg": content, "type": type };
    pendingMsgs[eventMsgs] = newPopup;
    eventMsgs += 1;
}

//Recalibrates Popup Queue
function popupNext() {
    if (eventMsgs < 1) return;
    for (let i = 0; i < eventMsgs; i++) {
        if (i != (eventMsgs - 1)) {
            pendingMsgs[i] = pendingMsgs[i + 1];
        }
    }
    eventMsgs -= 1;
}

//Manages Popup Creation
function popupCycle() {
    if (canMakePopup && eventMsgs > 0) {
        makePopup(pendingMsgs[0]);
        currentPop = pendingMsgs[0];
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Ship Animation Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Determines Random Points for Stars
function starMap(length, width) {
    let starSize = 3 * pixes;
    let starBuffer = 2;
    let starPlotter = 0;
    let fieldY = length / starSize;
    for (let i = 0; i < fieldY; i++) {
        starPlotter = 0;
        while (starPlotter < length - starSize) {
            starPlotter += Math.floor(Math.random() * length);
            if (starPlotter < width - starSize && i % starBuffer == 0) {
                totalStars += 1;
                starXs[totalStars] = starPlotter;
                starYs[totalStars] = i * starSize;
                starPlotter += (starSize + starBuffer);
            }
        }
    }
}

//Draws Stars Moving
function drawSpace(length, cycle, region) {
    let starDrawEdges = 4; //4 leaves a hole in the middle, 5 makes a solid shape
    //Draw Stars
    for (let i = 0; i < totalStars; i++) {
        let centerX = starXs[i];
        let centerY = starYs[i];
        let starDrawXs = [centerX + pixes, centerX, centerX - pixes, centerX, centerX];
        let starDrawYs = [centerY, centerY + pixes, centerY, centerY - pixes, centerY];
        //Adjust based on cycle
        for (let i2 = 0; i2 < starDrawEdges; i2++) {
            starDrawYs[i2] += cycle;
            if (starDrawYs[i2] > length) {
                starDrawYs[i2] -= length;
            }
        }
        region.fillStyle = "lightgoldenrodyellow";
        for (let i3 = 0; i3 < starDrawEdges; i3++) {
            region.fillRect(starDrawXs[i3], starDrawYs[i3], pixes, pixes);
        }
    }
}

//Determines Design for Ship
function shipMap() {
    let possibleShipDesigns = 5; //Max # of ship designs
    let shipModel = Math.floor(Math.random() * possibleShipDesigns);
    let compRows = [];
    let dc = randColor(false, 0); //Default Color
    let sc = randColor(true, dc); //Secondary Color
    shipHeight = 9;
    shipWidth = 9;
    //Ship Designs
    if (shipModel == 0) {

        compRows[0] = [0, 0, 0, 0, dc, 0, 0, 0, 0];
        compRows[1] = [0, 0, 0, dc, dc, dc, 0, 0, 0];
        compRows[2] = [dc, 0, 0, dc, sc, dc, 0, 0, dc];
        compRows[3] = [dc, dc, 0, dc, sc, dc, 0, dc, dc];
        compRows[4] = [dc, dc, dc, dc, sc, dc, dc, dc, dc];
        compRows[5] = [dc, dc, dc, sc, sc, sc, dc, dc, dc];
        compRows[6] = [dc, dc, sc, sc, sc, sc, sc, dc, dc];
        compRows[7] = [0, dc, dc, dc, dc, dc, dc, dc, 0];
        compRows[8] = [0, 0, dc, dc, 0, dc, dc, 0, 0];
    } else if (shipModel == 1) {
        compRows[0] = [0, 0, 0, dc, dc, dc, 0, 0, 0];
        compRows[1] = [0, dc, dc, dc, sc, dc, dc, dc, 0];
        compRows[2] = [dc, dc, dc, dc, sc, dc, dc, dc, dc];
        compRows[3] = [dc, 0, 0, dc, sc, dc, 0, 0, dc];
        compRows[4] = [0, 0, 0, dc, sc, dc, 0, 0, 0];
        compRows[5] = [0, 0, 0, dc, sc, dc, 0, 0, 0];
        compRows[6] = [0, 0, dc, dc, sc, dc, dc, 0, 0];
        compRows[7] = [0, dc, dc, dc, dc, dc, dc, dc, 0];
        compRows[8] = [0, 0, dc, dc, 0, dc, dc, 0, 0];
    } else if (shipModel == 2) {
        compRows[0] = [0, 0, 0, dc, dc, dc, 0, 0, 0];
        compRows[1] = [0, dc, dc, dc, sc, dc, dc, dc, 0];
        compRows[2] = [dc, dc, dc, sc, sc, sc, dc, dc, dc];
        compRows[3] = [dc, dc, sc, sc, sc, sc, sc, dc, dc];
        compRows[4] = [0, dc, dc, sc, sc, sc, dc, dc, 0];
        compRows[5] = [0, 0, dc, sc, sc, sc, dc, 0, 0];
        compRows[6] = [0, dc, dc, dc, sc, dc, dc, dc, 0];
        compRows[7] = [0, dc, dc, dc, dc, dc, dc, dc, 0];
        compRows[8] = [0, 0, dc, 0, dc, 0, dc, 0, 0];
    } else if (shipModel == 3) {
        compRows[0] = [0, dc, 0, 0, 0, 0, 0, dc, 0];
        compRows[1] = [dc, dc, dc, 0, 0, 0, dc, dc, dc];
        compRows[2] = [dc, sc, dc, dc, 0, dc, dc, sc, dc];
        compRows[3] = [dc, sc, sc, dc, dc, dc, sc, sc, dc];
        compRows[4] = [0, dc, sc, sc, sc, sc, sc, dc, 0];
        compRows[5] = [dc, sc, sc, dc, dc, dc, sc, sc, dc];
        compRows[6] = [dc, sc, dc, dc, 0, dc, dc, sc, dc];
        compRows[7] = [dc, dc, dc, 0, 0, 0, dc, dc, dc];
        compRows[8] = [dc, 0, dc, 0, 0, 0, dc, 0, dc];
    } else if (shipModel == 4) {
        compRows[0] = [0, 0, 0, 0, dc, 0, 0, 0, 0];
        compRows[1] = [0, 0, 0, dc, dc, dc, 0, 0, 0];
        compRows[2] = [0, 0, dc, dc, sc, dc, dc, 0, 0];
        compRows[3] = [0, 0, dc, sc, sc, sc, dc, 0, 0];
        compRows[4] = [0, dc, dc, sc, sc, sc, dc, dc, 0];
        compRows[5] = [0, dc, dc, sc, sc, sc, dc, dc, 0];
        compRows[6] = [dc, dc, dc, dc, sc, dc, dc, dc, dc];
        compRows[7] = [dc, dc, 0, dc, dc, dc, 0, dc, dc];
        compRows[8] = [dc, 0, 0, 0, dc, 0, 0, 0, dc];
    }

    //Final
    shipX -= ((shipWidth - 1) / 2);
    shipY -= ((shipHeight - 1) / 2);
    for (let i = 0; i < shipHeight; i++) {
        for (let i2 = 0; i2 < shipWidth; i2++) {
            shipParts[shipSpot(i, i2)] = compRows[i][i2];
        }
    }
}

//Returns Index # for a Ship Location
function shipSpot(x, y) {
    let result = (x * shipHeight) + y;
    return result;
}

//Fills Ship Parts with Default Ship Color
function shipFill(color, max) {
    for (let i = 0; i < max; i++) {
        shipParts[i] = color;
    }
}

//Returns Colors from Available Options
function randColor(secondary, base) {
    let randomizer = 0;
    if (secondary == true) {
        randomizer = Math.floor(Math.random() * (maxColors - 1));
        randomizer += base;
        if (randomizer > maxColors) randomizer -= maxColors;
        if (randomizer == 0) randomizer += 1;
        if (randomizer = base) randomizer += 1;
    } else {
        randomizer = Math.floor(Math.random() * maxColors);
        if (randomizer == 0) randomizer += 1;
    }
    return randomizer;
}

//Draws Ship Moving
function drawShip(cycle, region) {
    let draws = shipParts;
    for (let i = 0; i < shipHeight; i++) {
        for (let i2 = 0; i2 < shipWidth; i2++) {
            let i3 = (i2 * shipWidth) + i;
            if (draws[i3] != 0) {
                setColor(shipParts[i3], region);
                let x = shipX + (i * pixes);
                let y = shipY + (i2 * pixes);
                if (cycle == 0) {
                    x -= pixes;
                } else if (cycle == 2) {
                    x += pixes;
                }
                region.fillRect(x, y, pixes, pixes);
            }
        }
    }
}

//Sets Context Fill Color, Typically for Ship Animations
function setColor(color, region) {
    if (color == -1) {
        region.fillStyle = "lightgoldenrodyellow";
    } else if (color == 0) {
        region.fillStyle = "white";
    } else if (color == 1) {
        region.fillStyle = "brown";
    } else if (color == 2) {
        region.fillStyle = "limegreen";
    } else if (color == 3) {
        region.fillStyle = "darkred";
    } else if (color == 4) {
        region.fillStyle = "orangered";
    } else if (color == 5) {
        region.fillStyle = "darkolivegreen";
    } else if (color == 6) {
        region.fillStyle = "rebeccapurple";
    } else if (color == 7) {
        region.fillStyle = "deepskyblue";
    } else if (color == 8) {
        region.fillStyle = "darkslategray";
    } else if (color == 9) {
        region.fillStyle = "hotpink";
    } else if (color == 10) {
        region.fillStyle = "tan";
    } else if (color == 11) {
        region.fillStyle = "darkseagreen";
    } else if (color == 12) {
        region.fillStyle = "greenyellow";
    } else if (color == 13) {
        region.fillStyle = "lightskyblue";
    } else if (color == 14) {
        region.fillStyle = "aquamarine";
    } else if (color == 15) {
        region.fillStyle = "steelblue";
    }
}


//------------------------------------------------------------------------------------------------------------------------------------------------------
//Boom Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Makes an Explosion
function makeBoom(x, y, cycle, region, type) {
    let boomer = { "x": x, "y": y, "cycle": cycle, "region": region };
    boomsList[booms] = boomer;
    booms += 1;
}

//Draws an Explosion
function drawBoom(boom, region) {
    let colors = ["red", "orangered", "orange", "yellow", "whitesmoke", "darkred", "lightgray", "darkgray"];
    let boomLook = [5, 4, 3, 4, 5, 4, 3, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 3, 4, 5, 4, 3, 4, 5];
    let boomShades = [];
    boomShades[1] = [0, 1, 2, 3, 4, -1, -1, -1];
    boomShades[2] = [5, 0, 1, 2, 3, -3, -1, -1];
    boomShades[3] = [-1, 5, 0, 1, 2, 3, 1, -1];
    boomShades[4] = [-1, -1, 5, 0, 1, 2, 0, 1];
    boomShades[5] = [];
    for (let i4 = 0; i4 < cycleMaxBoom; i4++) {
        boomShades[5][i4] = -1;
    }

    //Actively Draw Finished Product when Needed
    if (boom.cycle > -1 && boom.cycle < cycleMaxBoom) {
        //Set Color Based on Cycle
        let boomColors = [];
        for (let i2 = 0; i2 < boomGrid * boomGrid; i2++) {
            boomColors[i2] = boomShades[boomLook[i2]][boom.cycle];
        }

        //Draw Explosion
        for (let i = 0; i < boomGrid; i++) {
            for (let i2 = 0; i2 < boomGrid; i2++) {
                let i3 = (i2 * boomGrid) + i;
                if (boomColors[i3] != -1) {
                    region.fillStyle = colors[boomColors[i3]];
                    let x = boom.x + (i * pixes);
                    let y = boom.y + (i2 * pixes);
                    if (boom.cycle > -1 && boom.cycle < cycleMaxBoom) region.fillRect(x, y, pixes, pixes);
                }
            }
        }
    }

    //Increment Countdown to End of Individual Boom Cycle
    if (cycleBoom % animIntervalBoom == 0) {
        boom.cycle += 1;
    }
}

//Creates a Standardized Animation to Loop on Loss
function lossBoom() {
    let boomsX = 2; //X Positions Drawn
    let boomsY = 2; //Y Positions Drawn
    let boomD = 5; //Spacing Between Points
    let boomT = 5; //Timing Variance, Random
    let extraX = 5;
    let extraY = 6;

    //Assign Points to Queue Booms
    for (let i = 0; i < boomsX; i++) {
        for (let i2 = 0; i2 < boomsY; i2++) {
            //Determine Positive or Negative, then Draw X
            let orientation = (Math.floor(Math.random() * 2));
            if (orientation == 0) {
                orientation = -1;
            } else {
                orientation = 1;
            }
            let x = shipX + (i * boomD * orientation) + extraX;

            //Determine Positive or Negative, then Draw X
            orientation = (Math.floor(Math.random() * 2));
            if (orientation == 0) {
                orientation = -1;
            } else {
                orientation = 1;
            }
            let y = shipY + (i2 * boomD * orientation);
            let cycle = (Math.floor(Math.random() * boomT) * -1) + extraY;
            makeBoom(x, y, cycle, context3, 0);
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Miscellaneous Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//General Updates
function update() {
    //Primary
    if (gamePaused == false) {
        frameTally += 1;
        cycleAnimations(); //Animation Cycles
        updateSelectableBoxes(); //Info Box
        resInfo(); //Resource Totals
        drawTaskPool();
        popupCycle(); //Cycles Popup Messages
    }

    //Final
    requestAnimationFrame(update);
}

//Animation Cycles
function cycleAnimations() {
    context.clearRect(0, 0, board.width, board.height);
    context2.clearRect(0, 0, board.width, board.height);
    context3.clearRect(0, 0, board3.width, board3.height);

    //space
    if (frameTally % animIntervalSpace == 0) cycleSpace += 0.5;
    if (cycleSpace >= cycleMaxSpace) {
        cycleSpace -= cycleMaxSpace;
    }
    drawSpace(spaceHeight, cycleSpace, context3);

    //ship
    if (frameTally % animIntervalShip == 0) cycleShip += 1;
    if (cycleShip >= cycleMaxShip) {
        cycleShip -= cycleMaxShip;
    }
    drawShip(cycleShip, context3);

    //explosions
    if (booms > 0) {
        for (let i = 0; i < booms; i++) {
            if (boomsList[i].cycle >= cycleMaxBoom) {
                if (i != (booms - 1)) {
                    boomsList[i] = boomsList[booms - 1];
                }
                booms -= 1;
                i -= 1;
            } else {
                drawBoom(boomsList[i], boomsList[i].region);
            }
        }
    }
    if (cycleBoom % animIntervalBoom == 0) {
        cycleBoom = 1;
    } else {
        cycleBoom += 1;
    }

    //crew
    if (frameTally % animIntervalCrew == 0) cycleCrew += 1;
    if (cycleCrew >= cycleMaxCrew) {
        cycleCrew -= cycleMaxCrew;
    }
    drawCrew();

    //icons
    if (frameTally % animIntervalIcon == 0) cycleIcon += 1;
    if (cycleIcon >= cycleMaxIcon) {
        cycleIcon -= cycleMaxIcon;
    }
    drawIcons();

    //Loss
    if (gameOver == true && winning == false && frameTally % (animIntervalShip * 2) == 0) {
        lossBoom();
    }

}

//Enables or Disables User Interactions and Additional Popups
function interactive(disable) {
    if (disable == true) {
        canMakePopup = false;
        canSelectCrew = false;
        canUpdateHelp = false;
        canPressTask = false;
        readoutWindow.innerText = "";
    } else {
        canMakePopup = true;
        canSelectCrew = true;
        canUpdateHelp = true;
        canPressTask = true;
    }
}

//Determines the player's highest or lowest resource
function findHighLow(high) {
    let best = 0;
    let value = resources[best];
    for (let i = 1; i < totalResc; i++) {
        if (high == true) {
            if (resources[i] > value) {
                best = i;
                value = resources[best];
            }
        } else {
            if (resources[i] < value) {
                best = i;
                value = resources[best];
            }
        }
    }
    return best;
}

//Deletes a Specified Document Element
function clearWin(win) {
    let box;
    box = document.getElementById(win);
    box.parentNode.removeChild(box);
}

//Modifies an Existing Window's CSS Style
function styleWin(win, styling, part) {
    win.style[part] = styling;
}

//Creates and Returns a New Window
function createWin(parent, id, type, styling) {
    let newWindow = parent.appendChild(document.createElement(type));
    newWindow.id = id;
    styleWin(newWindow, styling, "cssText");
    return newWindow;
}

//Adjusts Resource Total
function adjustRes(r, value, display) {
    if (r == progressPoint) value *= 2;
    resources[r] += value;
    if (display == true) {
        let content = "You ";
        if (value >= 0) content += "gain ";
        if (value < 0) content += "lose ";
        content += value + " " + rsc(r) + "!";
        popupQueue(content, 2);
    }
}

//Returns Capitalized Resource Name
function rsc(id) {
    return (rs[id].toString()).toUpperCase();
}

//Updates Resource Info for the Ship
function resInfo() {
    for (let i = 0; i < totalResc; i++) {
        let resName = "tracker" + i.toString();
        let block = document.getElementById(resName);
        //block.innerText = rs[i] + ": " + resources[i];
        block.innerText = rsc(i) + ": " + resources[i];
        if (threat.r1 == i || threat.r2 == i) {
            if (resources[i] > threatCost) {
                block.style["color"] = "darkblue";
            } else {
                if (i == 5) {
                    block.style["color"] = "darkred";
                } else {
                    block.style["color"] = "red";
                }
            }
        } else {
            block.style["color"] = "black";
        }
    }
    progressWindow.innerText = "Progress:\n" + parseInt(resources[progressPoint]).toString() + "%";
    dayWindowMsg.innerText = "Day\n" + parseInt(day).toString();
}

//Checks GameOver Conditions
function checkGameOver() {
    let end = false;

    //Check Resources
    for (let i = 0; i < totalResc; i++) {
        if (resources[i] <= 0) {
            end = true;
            winning = false;
        }
    }

    //Check Progress
    if (resources[progressPoint] >= victoryThreshold) {
        end = true;
        winning = true;
    }

    //Final
    return end;
}

//Process GameOver
function makeGameOver() {
    gameOver = true;
    lastWon = winning;
    if (winning) {
        threatWindow.innerText = "\nYOU WIN!";
        threatWindow.style["background"] = "darkgoldenrod";
        threatWindow.style["color"] = "white";
        threatWindow.style["border"] = "3px solid gold";
    } else {
        threatWindow.innerText = "\nGAME OVER!";
        threatWindow.style["color"] = "white";
    }
    threatWindow.style["font-size"] = "40px";
    let content = "";
    let d = "\n";
    let dd = d + d;
    if (winning) {
        content = "YOU WIN!" + dd + "After " + day + " days, the crew arrives safely at its new home. Soon, you will be able to guide a new crew on its journey!";
    } else {
        let failTally = -1;
        let fails = [];
        for (let i = 0; i < totalResc; i++) {
            if (resources[i] <= 0) {
                failTally += 1;
                fails[failTally] = i;
            }
        }
        for (let i = 0; i < failTally + 1; i++) {
            if (i > 0 && failTally >= 2) content += ",";
            if (i == failTally) content += " and";
            content += " " + rsc(fails[i]);
            if (i == 0) content = rsc(fails[i]);
        }
        content = "YOU LOSE!" + dd + "Low on " + content + ", the crew could not survive the perils of deep space.";
        for (let i = 0; i < totalCrew; i++) {
            if (i > 0) content += ",";
            if (i == totalCrew - 1) content += " and";
            content += " " + crewmenList[i].name;
        }
        content += " all perish...";

    }
    popupQueue(content, 3);
}


