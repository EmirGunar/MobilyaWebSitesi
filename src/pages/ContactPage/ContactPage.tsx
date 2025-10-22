import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/GlobalStyles';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const PageTitle = styled.h1`
  color: ${colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled.form`
  background-color: ${colors.surface};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const FormTitle = styled.h2`
  color: ${colors.text};
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #3498db;
  }
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const ContactInfo = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const InfoTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    margin-top: 0.2rem;
  }
  
  .content {
    h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    
    p {
      color: #7f8c8d;
      line-height: 1.6;
    }
  }
`;

const MapFrame = styled.iframe`
  margin-top: 1.5rem;
  width: 100%;
  height: 320px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 18px rgba(93, 78, 55, 0.18);
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  border: 1px solid #c3e6cb;
`;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada form verilerini işleyebilirsiniz
    console.log('Form verileri:', formData);
    setIsSubmitted(true);
    
    // Form verilerini temizle
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // 3 saniye sonra başarı mesajını gizle
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <PageContainer>
      <PageTitle>İletişim</PageTitle>
      
      <ContactContainer>
        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>Bize Ulaşın</FormTitle>
          
          {isSubmitted && (
            <SuccessMessage>
              Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
            </SuccessMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="name">Ad Soyad *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">E-posta *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="phone">Telefon</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Konu *</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Mesaj *</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mesajınızı buraya yazın..."
              required
            />
          </FormGroup>
          
          <SubmitButton type="submit">
            Mesaj Gönder
          </SubmitButton>
        </ContactForm>

        <ContactInfo>
          <InfoTitle>İletişim Bilgileri</InfoTitle>
          
          <InfoItem>
            <div className="icon">📍</div>
            <div className="content">
              <h3>Adres</h3>
              <p>
                Yukarı Dudullu, Nato Yolu Cd No:109<br />
                34775 Ümraniye / İstanbul
                <br />
                <a
                  href="https://maps.google.com/?q=Yukarı+Dudullu,+Nato+Yolu+Cd+No:109,+34775+Ümraniye/İstanbul"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: colors.accent, fontWeight: 600 }}
                >
                  Konumu Aç
                </a>
              </p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <div className="icon">📞</div>
            <div className="content">
              <h3>Telefon</h3>
              <p>
                <a
                  href="https://wa.me/905334394257"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: colors.accent, fontWeight: 600 }}
                >
                  0533 439 42 57 (WhatsApp)
                </a>
                <br />
                <a
                  href="https://wa.me/905465417595"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: colors.accent, fontWeight: 600 }}
                >
                  0546 541 75 95 (WhatsApp)
                </a>
              </p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <div className="icon">✉️</div>
            <div className="content">
              <h3>E-posta</h3>
              <p>
                <a
                  href="mailto:emirgunar954@gmail.com"
                  style={{ color: colors.accent, fontWeight: 600 }}
                >
                  emirgunar954@gmail.com
                </a>
              </p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <div className="icon">🕒</div>
            <div className="content">
              <h3>Çalışma Saatleri</h3>
              <p>
                Pazartesi - Cumartesi: 09:00 - 18:00<br />
                Pazar: Kapalı
              </p>
            </div>
          </InfoItem>
          
          <MapFrame
            title="ArselGroup Konum"
            src="https://maps.google.com/maps?q=Yukar%C4%B1%20Dudullu%2C%20Nato%20Yolu%20Cd%20No%3A109%2C%2034775%20%C3%9Cmraniye%2F%C4%B0stanbul&output=embed"
            loading="lazy"
            allowFullScreen
          />
        </ContactInfo>
      </ContactContainer>
    </PageContainer>
  );
};

export default ContactPage;
