interface EmailContactTemplateProps {

  message: string;


}

export const EmailContactTemplate: React.FC<EmailContactTemplateProps> = ({ message}) => {
  return (
    <section> 
      {message}
    </section>
  );
};

