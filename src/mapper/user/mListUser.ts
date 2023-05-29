export interface mListUser {
    status: true,
    data: {
        user: {
            id: string,
            email: string,
            urlAvatar: string,
            firstFunction: string,
            notificationSMS: string,
            notificationWS: string,
            notificationEmail: string,
        },
        person: [
            {
                id: string,
                dni: string,
                code: string,
                name: string,
                lastNameP: string,
                lastNameM: string,
                displayName: string,
                nacionality: string,
                birthDate: string,
                gender: string,
                phoneNumber: string,
                tlfNumber: string,
                address: string,

            },
            {
                id: string,
                dni: string,
                name: string,
                lastNameP: string,
                lastNameM: string,
                displayName: string,
                nacionality: string,
                birthDate: string,
                gender: string,
                phoneNumber: string,
                tlfNumber: string,
                address: string,
                headquarter: {
                    id: string,
                    name: string,
                    address: string,
                    tlfNumber: string,
                    urlImage: string,
                }
            }
        ]
        ,
        accessToken: string,
        roles: [{
            id: string,
            name: string,
            description: string,
            roleStr: string,
        }]

    }
}