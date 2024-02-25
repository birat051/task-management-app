export default class UserDetails{
    static async getUserDetailsByEmail(emailId:string)
    {
        const url='/api/getUserByEmail'
        try{
            const res=await fetch(url,{body: JSON.stringify({email: emailId}),method: 'POST', headers: {
                'Content-Type': 'application/json'
              }})
            const data=await res.json()

            if(res.status===200)
            {
                const {email,userId,name}=data
                return {
                    emailId:email,
                    userId,
                    name
                }
            }
            else{
                const {message}=data
                return {
                    message
                }
            }
        }
        catch(e)
        {
            return {
                message: 'Unexpected error occured'
            }
        }
    }
}