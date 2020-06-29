class Validation {
    Booking (data){
        var result = []
        if (!data.name || data.name.trim().length === 0){
            result.push({message: 'Name is required'});
        }
        if (!data.car || data.car.trim().length === 0){
            result.push({message: 'Car is required'});
        }
        if (!data.date || data.date.trim().length === 0){
            result.push({message: 'Date is required'});
        }
        if (new Date(data.date) < new Date()){
            result.push({message: 'Date must be greater than today'});
        }
        return result;
    }

    Contact (data){
        var result = []
        if (!data.firstName || data.firstName.trim().length === 0){
            result.push({message: 'FirstName is required'});
        }
        if (!data.surname || data.surname.trim().length === 0){
            result.push({message: 'Surname is required'});
        }
        if (!data.contactItems || data.contactItems.length === 0){
            result.push({message: 'Contact Item is required'});
        }
        return result;
    }

    Job (data){
        var result = []
        if (!data.name || data.name.trim().length === 0){
            result.push({message: 'Name is required'});
        }
        if (!data.car || data.car.trim().length === 0){
            result.push({message: 'Car is required'});
        }
        if (!data.spItems || data.spItems.length === 0){
            result.push({message: 'Sales item is required'});
        }
        return result;
    }
}