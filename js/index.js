var bookmarkNameInput=document.getElementById("bookmarkName");
var bookmarkURLInput=document.getElementById("bookmarkURL");

var bookmarkContainer=[];

if(localStorage.getItem("Website")!=null)
{
    bookmarkContainer=JSON.parse(localStorage.getItem("Website"));
    displayWebsite()
}


function addSite()
{
if(isValidSite(siteNameRegex ,  bookmarkNameInput) & isValidSite(siteUrlRegex ,  bookmarkURLInput))
{
    var site={
        code:bookmarkNameInput.value,
        url:bookmarkURLInput.value
    }
    bookmarkContainer.push(site)
    clearform()
    displayWebsite()
    localStorage.setItem("Website", JSON.stringify(bookmarkContainer))
}
else
{
    var container=` <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <div class="circles d-flex">
                    <span class="rounded-circle1 me-2"></span>
                    <span class="rounded-circle2 me-2"></span>
                    <span class="rounded-circle3 me-2"></span>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <p class="m-0 pb-2">
                    Site Name or Url is not valid, Please follow the rules below :
                </p>
                <ol class="rules list-unstyled m-0">
                    <li>
                        <i class="fa-regular fa-circle-right p-2"></i>Site name must
                        contain at least 3 characters
                    </li>
                    <li>
                        <i class="fa-regular fa-circle-right p-2"></i>Site URL must be a
                        valid one
                    </li>
                </ol>

            </div>
        </div>
    </div>
</div>`
    document.getElementById("modal").innerHTML=container;
    clearform()

}
}
function clearform()
{
    bookmarkNameInput.value=null;
    bookmarkURLInput.value=null;
    bookmarkNameInput.classList.remove("is-valid","is-invalid");
    bookmarkURLInput.classList.remove("is-valid","is-invalid");
}

function displayWebsite()
{
    var cartona=``
    for(var i=0;i<bookmarkContainer.length;i++)
    {
        cartona+=`
        <tr>
            <td class="p-3">${i+1}</td>
            <td class="p-3 text-capitalize">${bookmarkContainer[i].code}</td>
            <td><a href="${bookmarkContainer[i].url}" target="_blank"><button class="btn-visit btn px-3"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
            <td><button class="btn btn-delete" onclick="deletesite(${i})"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
        </tr> `
    }
    document.getElementById("tableContent").innerHTML=cartona;
}

function deletesite(index)
{
    bookmarkContainer.splice(index,1);
    displayWebsite();
    localStorage.setItem("Website", JSON.stringify(bookmarkContainer))
}




// validation

siteNameRegex=/^[a-zA-Z0-9]{3,}$/;
siteUrlRegex=/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}$/;

function isValidSite(regex,element)
{
    if(regex.test(element.value)==true)
    {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid") ;   
        return true;
    }
    else
    {
        element.classList.add("is-invalid"); 
        element.classList.remove("is-valid");
        return false;
    }

}

