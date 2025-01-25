import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 's1605yga',  
  dataset: 'production',        
  useCdn: false ,
  token: 'skHHBG93HpBxpPP7ijSTL1RAimHqjdi3Q7unH71iMWP7Mjp1x2he13Lz2F38roO8bkc6wPSr0cpNleAfDw9sInzopFIe84h6ycSZzlQRk5TKVR3hydbiWLLCTi5THO7RIFfboa4creK4y0XH2P7NxHx1Yslj48TcljLZplqLouc1cdRrPkwX',               
});

// async function checkEmailExists(email) {
//   const query = `*[_type == "user" && email == $email][0]`; // Ensure 'user' is the correct schema type
//   const params = { email: email };

//   try {
//     const result = await client.fetch(query, params);

//     if (result) {
//       return true; // Email exists
//     } else {
//       return false; // Email does not exist
//     }
//   } catch (err) {
//     console.error('Error checking email:', err);
//     return false; // Handle errors gracefully
//   }
// }

// // Call the checkEmailExists function on form submit
// async function handleSubmitForm(email) {
//   const emailExists = await checkEmailExists(email);

//   if (emailExists) {
//     alert('You can fill the form only once.');
//   } else {
//     // Proceed with the form submission or save the data
//     alert('Email is available for submission.');
//   }
// }

// // Example usage: Assuming you get the email from a form input
// const email = 'test@example.com'; // Replace with dynamic form email
// handleSubmitForm(email);