// TO RESET DIVS WITH INPUTS, HIDE BUTTONS AND OTHER UNNECESSARY ELEMENTS

function startlist () {
    $('#list_main').text(`It is a high time to add some lists...`);
    $('#delete_list').hide();
    $('#finish').hide();
    $('.existitem_list').hide();
    $('.creation_list').hide();
    $('#add_item_amount').hide();
    $('.labels').hide();
}

// TO CALL FUNCTION ON lOAD

$( document ).ready(startlist());

// ADDING NEW list ON CLICKING THE 'ADD NEW' BUTTON

$('#add_list').on('click', function(){
    let newHeader = $('#new_list_name').val();
    if (newHeader !== '') {
        $('#list_main').text(newHeader);
        $('#new_list_name').val('');
        $('.base_creation:eq(0)').nextAll().remove();
        $('.base_creation input').val('');
        $('#inputGroupSelect04').append(`<option id='${newHeader}'>${newHeader}</option>`);
        $('.creation_list').show();
        $('#finish').show();
        $('#delete_list').hide();
        $('#add_item_amount').show();
        $('.labels').hide();
        $('.existing_list').empty();
    }
});

// DELETING EXISTING LIST

$('#delete_list').on('click', function(){
    let textAsId = $('#list_main').text();
    let deleteOption = $('#' + textAsId);
    $(deleteOption).remove();
    $('#list_main').text('Create new list');
    $('.existing_list').empty();
    $('#delete_list').hide();
    $('#finish').hide();
    $('.labels').hide();
});

// COUNT CLICKS ON BUTTON THAT GENERATES NEW INPUT FIELDS

let countClicksInputNames = 0;

// GENERATE NEW INPUT FIELDS WITH RESPECTIVE NAMES, CLASSES AND PLACEHOLDERS

$('#add_item_amount').on('click', function(){
    countClicksInputNames++;
    let currentAmount = 0;
    let neededAmount = 2;
    let div = document.createElement('div');
    div.className = 'base_creation';
    while (currentAmount<neededAmount) {
        let generateInput = document.createElement("input");
            if (currentAmount%2===0) {
                generateInput.placeholder = 'item';
                generateInput.className = 'form-control key';
                generateInput.name = 'item'+(countClicksInputNames+1);
            } else {
                generateInput.placeholder = 'Amount';
                generateInput.className = 'form-control value';
                generateInput.name = 'amount'+(countClicksInputNames+1);
            }
        div.append(generateInput);
        $('.creation_list').append(div);
        currentAmount++;
    };
});

// EMPTY OBJECT TO FILL WITH INPUT VALUES

let genObj = {};

// EMPTY OBJECT TO FILL WITH OBJECTS WITH INPUT VALUES

let objectOfObjects = {};

// EMPTY ARRAYS WITH KEYS (VALUE OF INPUT WITH CLASS KEY) AND VALUES (VALUE OF INPUT WITH CLASS VALUE)
let arrayKey = [];
let arrayValue = [];

// GETTING KEYS AND VALUES FROM THE INPUTS. PUSHING THEM TO THE RESPECTIVE ARRAYS

function getKey(){
    let keys = $(".key");
    for(var i = 0; i < keys.length; i++){
    arrayKey.push($(keys[i]).val());
    }
    return arrayKey;
};

function getValue(){
    let values = $(".value");
    for(var i = 0; i < values.length; i++){
    arrayValue.push($(values[i]).val());
    }
    return arrayValue;
};

// FINISH CREATING NEW LIST

$('#finish').on('click', function(){
    let keyObj = getKey();
    let valObj = getValue();
    let keys = $(".key"); // TO KNOW THE AMOUNT OF FIELDS AND USE IT IN THE LOOP

    for (let i = 0; i<keys.length; i++) {
        genObj[keyObj[i]] = valObj[i];
    }

    let indX = $('#list_main').text();

    // SET THE TEXT OF THE LIST AS THE KEY OF OBJECT WITH OBECTS
    // SET THE OBJECT WITH INPUT VALUES AS THE VALUE OF OBJECT WITH OBJECT
    // NOW IT CAN BE ACCESSED WITH THE RESPECTIVE LIST NAME

    objectOfObjects[indX] = genObj;

    // RESETTING ARRAYS, OBJECT WITH INPUT VALUES AND INPUTS THEMSELVES (EXCEPT 1ST ONE)
    $('.base_creation:eq(0)').nextAll().remove();
    $('.base_creation input').val('');
    arrayKey = [];
    arrayValue = [];
    genObj = {};
    startlist();
    return objectOfObjects;
})

// TO SHOW EXISTING LIST ON MAIN HUB

function createResult() {
    let index = $('#inputGroupSelect04 option:selected').attr('id');
    let listNeeded = objectOfObjects[index];
    for (let key in listNeeded) {
        if (listNeeded.hasOwnProperty(key)) {
            let listAmount = listNeeded[key];
            let div = document.createElement('div');
            div.className = 'item_amount_paragraph';
            if (key === '' && listAmount === '') {
                $(div).html(`<p style="color:#dc3545"><i>No specified amount - just don't buy too much</i></p><p style="color:#dc3545"><i>Some secret item you didn't want to share with me</i></p>`);
            } else if (key === '' || listAmount === '') {
                if (key === '') {
                    $(div).html(`<p><i>${listAmount}</i></p><p style="color:#dc3545"><i>Some secret item you didn't want to share with me</i></p>`);
                } else if (listAmount === '') {
                    $(div).html(`<p style="color:#dc3545"><i>No specified amount - just don't buy too much</i></p><p>${key}</p>`);
                }
            } else {
                $(div).html(`<p><i>${listAmount}</i></p><p>${key}</p>`);
            }
            $('.existing_list').append(div);
        }
    }
}

$('#showOnMainHub').on('click', function(){
    $('.existing_list').empty();
    let header = $('#inputGroupSelect04 option:selected').val();
    if ($('#inputGroupSelect04 option:selected').val() !== 'Choose...') {
        $('#list_main').text(header);
        $('#finish').hide();
        $('#delete_list').show();
        $('.creation_list').hide();
        $('.existing_list').show();
        $('#add_item_amount').hide();
        $('.labels').show();
        createResult();
    }
});
