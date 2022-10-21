const nodemailer = require('nodemailer') 


exports.mailTransport = () => 
    nodemailer.createTransport({
	/* using gmail to send * /
	// service:"gmail",
    // auth: {
    //     user: process.env.MAIL_USERNAME,
    //     pass: process.env.MAIL_PASSWORD
    // },

	/* using mailtrap*/
    host : "smtp.mailtrap.io",
    port : 2525,
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD
    },

		pool: true, // use pooled connection
		//rateLimit: true, // enable to make sure we are limiting
		maxConnections:1, // set limit to 1 connection only
		maxMessages: 1, // send 3 emails per second
		//maxConnections: 1,
		rateDelta: 20000,
		rateLimit:3, 
    });   

exports.generateContactFormMail = ( username, email, msg)=>{
	return `
	<div >
	<table style="border: 2px solid #F7F7F7;table-layout:auto;min-width: 60%; max-width:100%;font-family: Arial, Helvetica, sans-serif; background-color:#fbfbfb; border-radius:13px">	
		<thead></thead>
		<tbody>
			<tr>
				<td style="padding:11px 12px;">Sender's&nbsp;email: </td>
				<td style="padding:11px 2px 11px 2px;">${email}</td>
			</tr>
			<tr >
				<td style="padding:11px 12px;">Message: </td>
				<td style="padding:11px 2px 11px 2px;">${msg}</td>
			</tr>
			<tr>
				<td colspan="2" style="padding:11px 16px;">~${username}</td>
			</tr>
		</tbody>
	</table>
  </div>`
	
}

exports.generateCreateUserMail = (url, username) => {
    return ` 
    <div style= width: 100% padding:100px; display: flex; align-content: start; justify-content: start;">
        <div style="max-width:  600px; margin: 70px; padding:50px 50px; background-color: #ffffff;  border-radius:8px;">
        	<div style="padding: 3px 20px;">
        		<div style="display:flex;">
		            <img src= "cid:logo"  style="width: 100px; " />
		            <div style="margin:15px 5px; padding:5px">
						<h4 style="margin:0; padding:0">Placement Cell</h4>
						<p style="margin:0; padding:0">Department of Computer Science, </br>
						University of Delhi</p>
		            </div>
	        	</div>
	            <h1>Registration for Placements'22</h1>
	            <p style="">Hello ${username} !<p>
	            <p>Please click the button below to complete your registration as soon as possible</p>
	            <a style="text-decoration: none; display: flex;justify-content: start; cursor: pointer; color:white;" href="${url}"><input type="submit" value="Register" 
					style="background-color:#56368A; color:#ffffff; border-radius:8px; border: 3px solid #56368A; padding: 9px 30px ;"></a></br>
	            </br>
	            </br>
				or open the link in your browser to proceed for registration
	            <a style="display:block; word-wrap: break-word; max-width:450px" href="${url}">${url}</a>
	            <br/>
	            <p>If you did not expect yourself to be registered,you can ignore this mail.</p>
	            <p style="margin-top: 60px;" >
	            Thanks,</br>
	            <span style="color:#555 ; font-size: 14px;" >Placement Cell'22</br>
	            Department of Computer Science <br>
				(Faculty of Mathematical Sciences)<br>
				1st Floor, New Academic Block<br>
				University of Delhi <br>
				Delhi - 110007
	            </p>
        	</div>
    	</div>
    </div>`
}

exports.generatePasswordResetMail = (url, username) =>{
    return `
	<div style="width: 100% padding:100px; display: flex; align-content: start; justify-content: start;">
		<div style="max-width:  600px; margin: 70px; padding:50px 50px; background-color: #ffffff;  border-radius:8px;">
			<div style="padding: 20px;">
				<div style="display: flex ; justify-content: start;">
					<img src= "cid:logo"  style="width: 100px;" />
					<div style="margin:15px 5px; padding:5px">
						<h4 style="margin:0; padding:0">Placement Cell</h4>
						<p style="margin:0; padding:0">Department of Computer Science, </br>
						University of Delhi</p>
					</div>
				</div>
				<p style="">Hello ${username} !<p>
				<p>Click the button below to Reset your password. The link will expire after 1hr</p>
				<a style="text-decoration: none;  display: flex;justify-content: start; cursor: pointer;color:white;" href="${url}">
					<input type="submit" value="Reset Password" style="background-color:#56368A; color:#ffffff;
					border-radius:8px; border: 3px solid #56368A; padding: 9px 30px ;">
				</a></br>
				</br>
	            </br>
				or open the link in your browser to reset your password
				<a style="display:block; word-wrap: break-word; max-width:450px" href="${url}">${url}</a>
				<br/>
				<p>If you did not request this link, you can ignore this mail.</p>
				<p style="margin-top: 60px;" >
				Thanks,</br>
				<span style="color:#555 ; font-size: 14px;" >Placement Cell'22</br>
				Department of Computer Science <br>
				(Faculty of Mathematical Sciences)<br>
				1st Floor, New Academic Block<br>
				University of Delhi <br>
				Delhi - 110007
				</p>
			</div>
		</div>
	</div>`
}

exports.generateSuccessPasswordResetMail = (username) =>{
    return `
	<div style="width: 100% padding:100px; display: flex; align-content: start; justify-content: start;">
		<div style="width:422px; margin: 70px; padding:50px 50px; background-color: #ffffff;  border-radius:8px;">
			<div style="padding: 20px;">
				<div style="display: flex ; justify-content: start;">
					<img src= "cid:logo"  style="width: 100px;" />
					<div style="margin:15px 5px; padding:5px">
						<h4 style="margin:0; padding:0">Placement Cell</h4>
						<p style="margin:0; padding:0">Department of Computer Science, </br>
						University of Delhi</p>
					</div>
				</div>
				<p style="">Hello ${username} !<p>
				<p>Your password has been reset successfully!</p>
				
				<p style="margin-top: 60px;" >
				Thanks,</br>
				<span style="color:#555 ; font-size: 14px;" >Placement Cell'22</br>
				Department of Computer Science <br>
				(Faculty of Mathematical Sciences)<br>
				1st Floor, New Academic Block<br>
				University of Delhi <br>
				Delhi - 110007
				</p>
			</div>
		</div>
	</div>`
}
