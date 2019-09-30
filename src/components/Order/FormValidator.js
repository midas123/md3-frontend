const formValidator = (target) =>{
    let valid = false;
    let result= '';
    switch(target.name){
        case 'orderer_name':{
            let nameValid = target.value.match(/^[가-힣]+$/);
            if(nameValid !== null && target.value.length !== nameValid.length){
                valid = true;
            }
            result = {
                name: 'isOrdererValid',
                isValid :valid
            }
            break;
        }

        case 'recipient_name':{
            let nameValid = target.value.match(/^[가-힣]+$/);
            if(nameValid !== null && target.value.length !== nameValid.length){
                valid = true;
            }
            result = {
                name: 'isNameValid',
                isValid :valid
            }
            break;
        }
        case 'mobilephone_number':{
            let mobilePhoneValid = 
            target.value.match(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/);
            if(mobilePhoneValid !== null && 
                target.value.length !== mobilePhoneValid.length){
                    valid = true;
            }
            result = {
                name: 'isPhoneNumberValid',
                isValid :valid
            }
            break;
        }
        case'email_address':{
            let emailValid = 
            target.value.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);

           
            if(emailValid !== null && 
                target.value.length !== emailValid.length){
                    valid = true;
            }
            result = {
                name: 'isEmailValid',
                isValid :valid
            }
            break;
        }
        case'address1':{
            let address1Valid = 
            target.value.match(/^[가-힣0-9\s]+$/);

           
            if(address1Valid !== null && 
                target.value.length !== address1Valid.length){
                    valid = true;
            }
            result = {
                name: 'isAddress1Valid',
                isValid :valid
            }
            break;
        }
        case'address2':{
            let address2Valid = 
            target.value.match(/^[가-힣0-9\s\-\(\)\,]+$/);

           
            if(address2Valid !== null && 
                target.value.length !== address2Valid.length){
                    valid = true;
            }
            result = {
                name: 'isAddress2Valid',
                isValid :valid
            }
            break;
        }
        case'zipcode':{
            let isZipCodeValid = 
            target.value.match(/^[0-9\s\-\,]+$/);

           
            if(isZipCodeValid !== null && 
                target.value.length !== isZipCodeValid.length){
                    valid = true;
            }
            result = {
                name: 'isZipCodeValid',
                isValid :valid
            }
            break;
        }
     
    
    default:

    }
    return result;
  
} 


export default formValidator;