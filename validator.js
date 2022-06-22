// Đối tượng validator
function validator(options){
    // Hàm thực hiện validate
    function validate(inputElement,rule){
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector('.form-message')
        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        }else{
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')  
        }
    }
    // Lấy element của form
    var formElement = document.querySelector(options.form)
    if (formElement){
        options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector)
            if(inputElement){
                // Xử lý trường hợp blur ra ngoài
                inputElement.onblur = function(){
                    // value :inputElement.value
                    // rules.test   
                    validate(inputElement,rule)
                }
                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector('.form-message')

                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')  
                }
            }
        })
    }
}
// định nghĩa rules
validator.isRequired = function(selector,message){
    return {
        selector: selector,
        test: function(value){
            // 1. có lỗi thị hiện chữ vui lòng nhập trường này 
            // 2. hợp lệ thì trả về undefined
            return value ? undefined : message || 'vui lòng nhập trường này';
        }
    };
}
validator.isEmail = function(selector,message){
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này không phải là email'
        }
    };
    
}
validator.minLength = function(selector, min){
    return {
        selector: selector,
        test: function(value){
            return value.length >= 6 ? undefined : 'Vui lòng nhập tối thiểu 6 ký tự'
        }
    };
    
}
validator.isConfirmed = function(selector, getConfirmValue, message){
    return {
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message ||  'Không khớp vơi mật khẩu'
        }
    };
}