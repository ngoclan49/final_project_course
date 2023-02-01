export const makeStyle = (role: string) => {
    if (role === 'ADMIN') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
        }
    }
    else if (role === 'USER') {
        return {
            background: '#ffadad8f',
            color: 'red',
        }
    } else {
        return {
            background: '#7e7d7d',
            color: 'white'
        }
    }
}

export const styleGender = (gender: boolean) => {
    if (gender === false) {
        return {
            background: 'rgb(247, 167, 86)',
            color: 'white',
        }
    }
    else if (gender === true) {
        return {
            background: '#1990FF',
            color: 'white',
        }
    } 
}