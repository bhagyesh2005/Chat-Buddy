//                                     ||SHREE KRISHNA||

const imglogin = document.querySelector('.img-login');
const popUpRight = document.querySelector('.pop-up-right');
const pc = document.getElementById('popup-click1');
const pop = document.querySelector('.popup-class1');
const close = document.getElementById('close');
const menu = document.querySelector('.menu');
const searchcontainer = document.querySelector('#searchInput');
const p = document.getElementById('pop-up1');
const day = document.getElementById('day');
const night = document.getElementById('night');
const sideDrawer = document.querySelector('.sideDrawer');
const searchButton = document.getElementById('searchButton');
const loadingOverlay = document.getElementById('loadingOverlay');
const back = document.getElementById('back');
const navbar = document.querySelector('.nav-bar');
const CROSS = document.querySelector('.CROSS');
const inSVG = document.querySelector('.inSVG ');
const firstBoxAElement = document.querySelector('#BOX a:first-child');
const ChatSelector = document.querySelector('.ChatSelector');
const chatColor = document.querySelector("#chat span");
const CreateGroup = document.getElementById('CreateGroup');
const BackToChat = document.querySelector('.BackToChat');
const PeopleToAdd = document.getElementById('PeopleToAdd');
const ChunksArray = document.querySelector('.ChunksArray');
const ChatRoom = document.querySelector('.ChatRoom');
let ChatPerson = document.querySelector('.ChatPerson');

// Seeting up the localStorage 
async function SetToken() {
    try {
        const response = await fetch('http://localhost:5500/api/user/Settoken');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }


    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

SetToken();

function universalEffect() {
    imglogin.addEventListener('click', () => {
        imglogin.classList.toggle('hover-effect');
        popUpRight.classList.toggle('UpToDown');
    });

    p.style.backgroundColor = "#fff";

    pc.addEventListener('click', () => {
        pop.classList.toggle('is-active');
    });

    close.addEventListener('click', () => {
        pop.classList.add('is-active');
    });
    night.addEventListener('click', () => {
        localStorage.setItem("theme", "dark");
        night.classList.add('is-active');
        day.classList.remove('is-active');
        let SmallPopChunks = document.querySelector('.SmallPopChunks');
        SmallPopChunks.classList.remove('AddColor');
        const box = ['.pop-up-right', '.pop-up-right a', '#pop-up1', 'BOX', '.SmallPopChunks'];
        box.forEach(id => {
            const element = document.querySelector(id);
            if (element) {
                element.classList.add('box-color');
            }
        });
        const idArray = ['#op', '#op1', '#searchInput'];
        document.body.style.backgroundColor = "#1c1c1f"
        idArray.forEach(id => {
            const element = document.querySelector(id);
            if (element) {
                element.classList.add('BackGround');
            }
        });
        p.style.backgroundColor = "#242428";
        const color = ['.nav-image h1', '#hov', '.down', '.menu', '.inSVG', '.CROSS'];
        color.forEach(id => {
            const element = document.querySelector(id);
            if (element) {
                element.classList.add('CisActive');
            }
        });
        sideDrawer.classList.remove('white');
        sideDrawer.classList.add('black');
        chatColor.classList.remove('color');
    });
    day.addEventListener('click', () => {
        day.classList.add('is-active');
        night.classList.remove('is-active');
        const box = ['.pop-up-right', '.pop-up-right a', '#pop-up1', 'BOX'];
        box.forEach(id => {
            const element = document.querySelector(id);
            if (element) {
                element.classList.remove('box-color');
            }
        });
        const idArray = ['op', 'op1', 'searchInput'];
        document.body.style.backgroundColor = "#fff"
        idArray.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('BackGround');
            }
        });
        p.style.backgroundColor = "#fff";
        const color = ['.nav-image h1', '#hov', '.down', '.menu', '.inSVG', '.CROSS'];
        color.forEach(id => {
            const element = document.querySelector(id);
            if (element) {
                element.classList.remove('CisActive');
            }
        });
        sideDrawer.classList.add('white');
        var SmallPopChunks = document.querySelector('.SmallPopChunks');
        SmallPopChunks.classList.add('AddColor');
    });
}


universalEffect();

const SearchUser = () => {
    searchcontainer.addEventListener('click', () => {
        sideDrawer.classList.remove('RIGHT_PART');
        back.classList.remove('no-display');
    });
}

SearchUser();

const MenuBar = () => {
    menu.addEventListener('click', () => {
        const MobileSearch = document.querySelector('.MobileSearch');
        navbar.classList.add('is-active');
        MobileSearch.classList.remove('is-active');
    });

    CROSS.addEventListener('click', () => {
        var MobileSearch = document.querySelector('.MobileSearch');
        navbar.classList.remove('is-active');
        MobileSearch.classList.add('is-active');
    });
}

MenuBar();

let val = document.querySelector('#searchInput');
let inSearch = document.getElementById('inSearch');

inSearch.addEventListener('click', () => {
    sideDrawer.classList.remove('RIGHT_PART');
    back.classList.remove('no-display');
});

// For removing fetched content when input is empty.

function ClearDiv() {
    if (val.value === '') {

        // Clear existing content
        while (ToBeAppended.firstChild) {
            ToBeAppended.removeChild(ToBeAppended.firstChild);
        }
    }
}

//  For Spinner Show and hide section

function showSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
}
function hideSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

val.addEventListener('keyup', ClearDiv);
inSearch.addEventListener('keyup', ClearDiv);

const ToBeAppended = document.getElementById('SubDiv');

// For fetching url from the backend and searching

const FetchForSearch = async () => {
    let searchTerm = val.value || inSearch.value;
    let Nothing = document.querySelector('.Nothing');
    let GetName = document.getElementById('GetName');
    let GetEmail = document.getElementById('GetEmail');
    loadingOverlay.style.display = 'flex';

    // Append the search term as a query parameter

    const apiUrl = `http://localhost:5500/api/user/ser?search=${encodeURIComponent(searchTerm)}`;
    await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('UserToken')}`,
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            // Appending the chunks or element that is requsted by 

            for (let i = 0; i < data.length; ++i) {
                const Element = document.createElement('div');
                Element.innerHTML = `
                    <div id="Chunks">
                    <img src="${data[i].pic}"
                        alt="Just InterNetThing">
                    <div class="Sub-Chunks">
                        <span>${data[i].name}</span>
                        <span style="font-size: 15px;">
                            <div style="font-weight: bolder;">Email:</div>
                            <div>${data[i].email}</div>
                        </span>
                    </div>
                </div>  
                    `
                Element.addEventListener('click', async () => {
                    await fetch('http://localhost:5500/api/chat/access-chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${data[i].token}`,
                        },
                        body: JSON.stringify({
                            userId: data[i]._id,
                        }),
                    });
                    let ChatChunk = document.createElement('div');
                    ChatChunk.innerHTML = `<div id="chat" class="OP">
                              <span class="color">${data[i].name}</span>
                              </div>`;
                    ChatChunk.addEventListener('click', () => {
                        Nothing.classList.add('is-active');

                        let MainStuff = document.createElement('div');
                        MainStuff.style.height = '100%';
                        ChatRoom.textContent = '';
                        MainStuff.innerHTML = `
                    <div class="Wrap">
                    <div class="MainContainerStuff display-flex justify-space align-item">
                        <h1>
                            ${data[i].name}
                        </h1>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" id="EYE"
                            fill="currentColor">
                            <path
                                d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z">
                            </path>
                        </svg>
                    </div>
                    <div class="IntoChat">
                      
                    </div>
                </div>
                    `
                        ChatRoom.append(MainStuff);
                        GetName.innerHTML = '';
                        GetEmail.innerHTML = '';
                        GetName.innerHTML = data[i].name;
                        GetEmail.innerHTML = data[i].email;
                        let EYE = document.getElementById('EYE');
                        ForResponsive();
                        EYE.addEventListener('click', () => {
                            pop.classList.remove('is-active');
                        });
                    });
                    ChatSelector.append(ChatChunk);
                });
                ToBeAppended.append(Element);
            }

            loadingOverlay.style.display = 'none';

        })
        .catch(error => {

            console.error('Error:', error);
            loadingOverlay.style.display = 'none';

        });
}

let inBtn = document.querySelector('.inBtn');
searchButton.addEventListener('click', FetchForSearch);  // For PC
inBtn.addEventListener('click', FetchForSearch);

// To remove side drawer 

back.addEventListener('click', () => {
    sideDrawer.classList.add('RIGHT_PART');
    back.classList.add('no-display');
});

let isUp = true;

inSVG.addEventListener('click', () => {
    var box = document.getElementById('BOX');
    if (isUp) {
        box.style.top = '110px';
    } else {
        box.style.top = '-110px';
    }

    // Toggle the state for the next click
    isUp = !isUp;
});

firstBoxAElement.addEventListener('click', () => {
    var pop = document.querySelector('.popup-class1');
    pop.classList.remove('is-active');
});

// For adding the new group Chat

const CreateGroupChat = () => {
    var GroupChatPopUp = document.querySelector('.GroupChatPopUp ');
    var SmallPopChunks = document.querySelector('.SmallPopChunks');
    GroupChatPopUp.style.display = '';
    GroupChatPopUp.style.backgroundColor = '#00000030';
    SmallPopChunks.classList.add('AddColor');
}

const GoBackToChat = () => {
    var GroupChatPopUp = document.querySelector('.GroupChatPopUp ');
    var SmallPopChunks = document.querySelector('.SmallPopChunks');
    var PopulatedChat = document.querySelector('.PopulatedChat');
    var SmallPopChunks = document.querySelector('.SmallPopChunks');
    GroupChatPopUp.style.display = 'none';
    PopulatedChat.classList.add('is-active');
    SmallPopChunks.classList.remove('ShowHeight');
}

BackToChat.addEventListener('click', GoBackToChat);
CreateGroup.addEventListener('click', CreateGroupChat);

// For creating the group of people that are going to be added.

PeopleToAdd.addEventListener('click', () => {
    var PopulatedChat = document.querySelector('.PopulatedChat');
    var SmallPopChunks = document.querySelector('.SmallPopChunks');
    SmallPopChunks.classList.add('ShowHeight');
    PopulatedChat.classList.remove('is-active');
    PopulatedChat.style.opacity = 1;
    PopulatedChat.style.transform = 'translateY(0)';
});

// Fetching for group chat

// var value1 = (For group Name) 
var value2 = document.getElementById('PeopleToAdd');
var PopulatedChat = document.querySelector('.PopulatedChat');

// For clearing the div 
function ClearDiv2() {
    if (value2.value === '') {

        // Clear existing content
        while (PopulatedChat.firstChild) {
            PopulatedChat.removeChild(PopulatedChat.firstChild);
        }
    }
}

value2.addEventListener('keyup', ClearDiv2);

let PeoplesGroup = [];
const FetchForGroupSearch = async (event) => {
    if (event.keyCode === 13) {
        let searchTerm = value2.value;
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.width = '100%';
        const apiUrl = `http://localhost:5500/api/user/ser?search=${encodeURIComponent(searchTerm)}`;

        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('UserToken')}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            for (let i = 0; i < data.length; ++i) {
                const Element = document.createElement('div');
                Element.innerHTML = `
                    <div class="PopulatedSmallChunks">
                        <img src="${data[i].pic}" alt="Just Internet Thing">
                        <div class="Sub-Chunks">
                            <span>${data[i].name}ya</span>
                            <span style="font-size: 15px;">
                                <div style="font-weight: bolder;">Email: </div>
                                <div>${data[i].email}</div>
                            </span>
                        </div>
                    </div>
                `;

                Element.addEventListener('click', () => {
                    let ChatChunk = document.createElement('div');

                    ChatChunk.innerHTML = `<div class="ChunksArrayElement">
                        <p style="overflow:hidden;">${data[i].name}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" id="Delete"
                            fill="currentColor">
                            <path
                                d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z">
                            </path>
                        </svg>
                    </div>`;
                    PeoplesGroup.push(data[i]);
                    ChatChunk.addEventListener('click', () => {
                        if (ChatChunk) {
                            ChunksArray.removeChild(ChatChunk);

                            // Find the index of the element with matching email in PeoplesGroup
                            const indexToRemove = PeoplesGroup.findIndex((item) => item.email === data[i].email);

                            if (indexToRemove !== -1) {
                                // Remove the element from PeoplesGroup
                                PeoplesGroup.splice(indexToRemove, 1);
                                console.log(data[i].name + ' removed from PeoplesGroup');
                            } else {
                                console.log(data[i].name + ' not found in PeoplesGroup');
                            }
                        }
                    });

                    ChunksArray.append(ChatChunk);
                });
                PopulatedChat.append(Element);
            }

            loadingOverlay.style.display = 'none';
        } catch (error) {
            console.error('Error:', error);
            loadingOverlay.style.display = 'none';
        }
    }
};


// For adding the group into Chatselector 

async function CreateGroupChat2() {
    let GroupChatName = document.getElementById('ChatName');
    const PopUpBtn = document.querySelector('.PopUpBtn button');
    const Nothing = document.querySelector('.Nothing');
    const UpdatedArray = document.querySelector('.UpdatedArray');

    PopUpBtn.addEventListener('click', async () => {
        let GName = GroupChatName.value;
        showSpinner();
        const response = await fetch('http://localhost:5500/api/chat/group', {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('UserToken')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                users: JSON.stringify(PeoplesGroup),
                name: GName,
            }),
        });
        hideSpinner();
        console.log(GName);

        const Chop = document.createElement('div');
        Chop.innerHTML = `
                <div id="chat">
                    <span class="color">${GName}</span>
                </div>
            `;
        ChatSelector.append(Chop);

        Chop.addEventListener('click', () => {
            Nothing.classList.add('is-active');
            showSpinner();
            ChatRoom.innerHTML = '';
            const CreateDiv = document.createElement('div');
            CreateDiv.innerHTML = `
                    <div class="Wrap">
                        <div class="MainContainerStuff display-flex justify-space align-item">
                            <h1>${GName}</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" id="EYE"
                                fill="currentColor">
                                <path
                                    d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z">
                                </path>
                            </svg>
                        </div>  
                        <div class="IntoChat"></div>
                    </div>
                `;
            CreateDiv.style.height = '100%';
            ChatRoom.append(CreateDiv);
            hideSpinner();
            const EYE = document.getElementById('EYE');
            const CRUD = document.querySelector('.CRUD');

            EYE.addEventListener('click', async () => {
                CRUD.classList.remove('is-active');
                EYE.classList.remove('is-active');
                let idForUpdate;
                console.log(localStorage.getItem('UserToken'));
                try {
                    showSpinner();

                    const response = await fetch(`http://localhost:5500/api/chat/searchGroup?chatName=${GName}`, {
                        method: 'GET',
                        headers: {
                            'authorization': `Bearer ${localStorage.getItem('UserToken')}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    const user = await response.json();
                    hideSpinner();
                    idForUpdate = user._id;
                    if (!user || !user.users || !Array.isArray(user.users)) {
                        console.error('Invalid user data structure');
                        return;
                    }
                    UpdatedArray.innerHTML = '';
                    for (const person of user.users) {

                        const SmallChunks = document.createElement('div');
                        SmallChunks.innerHTML = `
                            <div class="UpadatedChunk">
                                <p style="overflow:hidden;">${person}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="CloseChunk" fill="currentColor">
                                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                                </svg>
                            </div>
                        `;
                        UpdatedArray.append(SmallChunks);
                    }

                    // For Renaming or Updating the user
                    //  Fetching the URL For the renaimg the group 
                    let UpdatedChatName = document.getElementById('UpdatedChatName');
                    let UpdatedBtn = document.querySelector('.UpdatedBtn');
                    UpdatedBtn.addEventListener('click', async () => {
                        try {
                            showSpinner();
                        } catch (error) {
                            console.log("There are an error called: " + error);
                            hideSpinner();
                            return;
                        }
                    });
                } catch (error) {
                    hideSpinner();
                    console.error("There is an error:", error);
                    return;
                }
            });

        });
        window.location.reload();
    });

}

CreateGroupChat2();

value2.addEventListener('keydown', FetchForGroupSearch);

// For making the ChatRoom Responsive
function ForResponsive() {
    let ChatPerson = document.querySelector('.ChatPerson');
    let outerDiv = document.querySelector('.ChatSelector');
    outerDiv.addEventListener('click', function (event) {
        if (event.target.classList.contains('OP')) {
            if (window.innerWidth < 848) {
                ChatPerson.classList.add('is-active');
                ChatRoom.style.display = "block";
            }
        }
    });
}

// For GroupChat

function CloseTheDiv() {
    document.querySelector('.CloseDiv').addEventListener('click', () => {
        document.querySelector('.CRUD').classList.add('is-active');
    });
}

CloseTheDiv();

function Getwidth() {
    const UpdatedUserName = document.getElementById('UpdatedUserName');
    const search_in_chunks = document.querySelector('.search-in-chunks');
    UpdatedUserName.addEventListener('click', () => {
        let UnderCrud = document.querySelector('.UnderCrud');
        UnderCrud.style.height = '77%';
        search_in_chunks.classList.remove('is-active');
    });
}

Getwidth();

function GetReload() {
    let UpdatedBtn = document.querySelector('.UpdatedBtn');
    UpdatedBtn.addEventListener('click', () => {
        window.location.reload();
    });
}

GetReload();
