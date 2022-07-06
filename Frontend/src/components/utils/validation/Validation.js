export const isEmpty = value => {
    if(!value) return true
    return false
}

export const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const isPassword = pass => {
   let flag = true
   const re1 = /(?=.*?[A-Z])/
   let invalid = 'Invalid password because missing '
   if(!re1.test(pass)){
    flag = false
    invalid += 'capitalize letter'
   }
   const re2 = /(?=.*?[0-9])/
   if(!re2.test(pass)){
    if(flag){
        invalid += 'numeric value'
        flag = false
    }
    else{
        invalid += ', numeric value'
    }
   
   }
   
   const re3 = /(?=.*?[a-z])/
   if(!re3.test(pass)){
    if(flag){
        invalid += 'lower letter'
        flag = false
    }
    else{
        invalid += ', lower letter'
    }
   
   }

   if(!pass.includes('@')){
    if(flag){
        invalid += "'@' sign"
        flag = false
    }
    else{
        invalid += ", '@' sign"
    }
   
   }


   if(flag){
    return 'correct'
   }
   else{
       return invalid
   }
  
}

export const isLength = password => {
    if(password.length < 6) return true
    return false
}

export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}