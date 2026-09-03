import { useState } from "react";
import FormMessage from "../components/common/FormMessage";

export default function Contact() {
  const [form,setForm]=useState({name:"",email:"",subject:"",message:""});
  const [errors,setErrors]=useState({});
  const [success,setSuccess]=useState("");

  function change(e){const {name,value}=e.target;setForm(c=>({...c,[name]:value}));setErrors(c=>({...c,[name]:""}));setSuccess("");}
  function submit(e){
    e.preventDefault(); const next={};
    if(!form.name.trim()) next.name="Name is required.";
    if(!form.email.trim()) next.email="Email is required.";
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email="Enter a valid email address.";
    if(!form.subject.trim()) next.subject="Subject is required.";
    if(form.message.trim().length<10) next.message="Message must be at least 10 characters.";
    setErrors(next); if(Object.keys(next).length) return;
    setSuccess("Thank you! Your message was submitted successfully.");
    setForm({name:"",email:"",subject:"",message:""});
  }

  return <section className="page-section">
    <div className="page-heading"><div><h1>Contact</h1><p>Send us a question or feedback about Student Tracker.</p></div></div>
    <section className="panel contact-panel">
      <form className="contact-form" onSubmit={submit} noValidate>
        <label><span>Name</span><input name="name" value={form.name} onChange={change}/><FormMessage>{errors.name}</FormMessage></label>
        <label><span>Email</span><input type="email" name="email" value={form.email} onChange={change}/><FormMessage>{errors.email}</FormMessage></label>
        <label><span>Subject</span><input name="subject" value={form.subject} onChange={change}/><FormMessage>{errors.subject}</FormMessage></label>
        <label><span>Message</span><textarea name="message" rows="6" value={form.message} onChange={change}/><FormMessage>{errors.message}</FormMessage></label>
        <button className="button primary" type="submit">Send Message</button>
        <FormMessage type="success">{success}</FormMessage>
      </form>
    </section>
  </section>;
}
