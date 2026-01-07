import { useCallback, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import IconMail from '@public/svgs/mail.svg'
import IconSend from '@public/svgs/send.svg'
import IconSuccess from '@public/svgs/success.svg'
import IconError from '@public/svgs/error.svg'
import IconInfo from '@public/svgs/info.svg'

const THROTTLE_DELAY = 60000;

const ContactForm = (): JSX.Element => {
  const [formStatus, setFormStatus] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | 'info' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValues, setInputValues] = useState({
    from_name: '',
    reply_to: '',
    message: ''
  });
  const lastSubmitTime = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const [isStatusVisible, setIsStatusVisible] = useState(false);

  useEffect(() => {
    if (formStatus) {
      setIsStatusVisible(true);
      const timer = setTimeout(() => {
        setIsStatusVisible(false);
        setTimeout(() => {
          setFormStatus('');
          setStatusType('');
        }, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_KEY);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const throttledHandleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = Date.now();

    if (now - lastSubmitTime.current < THROTTLE_DELAY) {
      setFormStatus(`잠시 후에 다시 시도해주세요. (${Math.ceil((THROTTLE_DELAY - (now - lastSubmitTime.current)) / 1000)}초 후 가능)`);
      setStatusType('info');
      return;
    }

    setIsSubmitting(true);
    const form = e.currentTarget;

    try {
      if (process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID && process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
        const result = await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, form);
        if (result.text === 'OK') {
          setFormStatus('메시지가 성공적으로 전송되었습니다!');
          setStatusType('success');
          form.reset();
          setInputValues({
            from_name: '',
            reply_to: '',
            message: ''
          });
          lastSubmitTime.current = now;
        } else {
          setFormStatus('메시지 전송에 실패했습니다. 다시 시도해주세요.');
          setStatusType('error');
        }
      } else {
        throw new Error("error");
      }
    } catch (error) {
      setFormStatus('오류가 발생했습니다. 나중에 다시 시도해주세요.');
      setStatusType('error');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <Container
      ref={formRef}
      onSubmit={throttledHandleSubmit}
      className={isSubmitting ? 'submitting' : ''}
    >
      <Note>
        <IconMail />
        메시지는 <EmailHighlight>tlaals44@naver.com</EmailHighlight>으로 전송됩니다.
      </Note>
      <FormField className={inputValues.from_name ? 'has-value' : ''}>
        <FormInput
          type="text"
          name="from_name"
          id="from_name"
          value={inputValues.from_name}
          onChange={handleInputChange}
          required
        />
        <FormLabel htmlFor="from_name">보내는 사람</FormLabel>
      </FormField>

      <FormField className={inputValues.reply_to ? 'has-value' : ''}>
        <FormInput
          type="text"
          name="reply_to"
          id="reply_to"
          value={inputValues.reply_to}
          onChange={handleInputChange}
          required
        />
        <FormLabel htmlFor="reply_to">연락처 (이메일, 휴대폰 등)</FormLabel>
      </FormField>

      <FormField className={inputValues.message ? 'has-value' : ''}>
        <FormTextArea
          name="message"
          id="message"
          value={inputValues.message}
          onChange={handleInputChange}
          required
        />
        <FormLabel htmlFor="message">메시지 내용</FormLabel>
      </FormField>

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoadingSpinner />
            전송 중...
          </>
        ) : (
          <>
            <IconSend />
            <p>메시지 보내기</p>
          </>
        )}
      </SubmitButton>

      <FormStatus className={isStatusVisible ? `visible ${statusType}` : ''}>
        {statusType === 'success' && <IconSuccess />}
        {statusType === 'error' && <IconError />}
        {statusType === 'info' && <IconInfo />}
        <span>{formStatus}</span>
      </FormStatus>
    </Container>
  );
};

export default ContactForm;

const Container = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 550px;
  padding: 1.5rem;
  padding-top: 2rem;
  background: rgba(12, 12, 20, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(101, 101, 182, 0.15);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &.submitting {
    transform: scale(0.99);
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Note = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: #858699;
  font-size: 0.9rem;
  text-align: center;
  
  @media (max-width: 470px) {
    font-size: 0.8rem;
    margin-bottom: 2rem;
  }
`;

const EmailHighlight = styled.span`
  color: #8A87FF;
  font-weight: 600;
`;

const FormField = styled.div`
  position: relative;
  margin-bottom: 1rem;
  width: 100%;
  
  &.has-value label,
  input:focus ~ label {
    color: #8A87FF;
    font-size: 0.6875rem;
    transform: translateY(-155%);
  }

  &.has-value:has(textarea) textarea ~ label, textarea:focus ~ label {
    color: #8A87FF;
    font-size: 0.6875rem;
    transform: translateY(-80%) !important;
  }
`;

const FormInput = styled.input`
  width: 100%;
  height: 3.625rem;
  padding: 1.75rem 1rem 0.8rem;
  outline: none;
  border: 1px solid #2a2a30;
  border-radius: 0.5rem;
  background-color: rgba(12, 12, 20, 0.5);
  color: #fff;
  font-size: 0.875rem;
  font-family: var(--font-pretendard);
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #6565b6;
    box-shadow: 0 0 0 2px rgba(101, 101, 182, 0.25);
  }
  
  &:hover:not(:focus) {
    border-color: #3d3d50;
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  min-height: 12em;
  padding: 1.75rem 1rem 0.6rem;
  outline: none;
  border: 1px solid #2a2a30;
  border-radius: 0.5rem;
  background-color: rgba(12, 12, 20, 0.5);
  color: #fff;
  font-size: 1em;
  font-family: var(--font-pretendard);
  resize: vertical;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #6565b6;
    box-shadow: 0 0 0 2px rgba(101, 101, 182, 0.25);
  }
  
  &:hover:not(:focus) {
    border-color: #3d3d50;
  }
`;

const FormLabel = styled.label`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8c8ca0;
  font-size: 0.875rem;
  pointer-events: none;
  transition: all 0.2s ease;
  
  ${FormTextArea} ~ & {
    top: 1.2rem;
    transform: none;
  }
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9em 1.2em;
  background: ${props => props.disabled ? '#2e2d37' : 'linear-gradient(135deg, #4b39ef 0%, #352d71 100%)'};
  color: ${props => props.disabled ? '#6f6d83' : '#fff'};
  border: none;
  border-radius: 0.5rem;
  font-size: 1em;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(75, 57, 239, 0.2);
  
  &:hover:not(:disabled) {
    box-shadow: 0 4px 15px rgba(75, 57, 239, 0.3);
    background: linear-gradient(135deg, #5a48ff 0%, #433791 100%);
  }
`;

const FormStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: center;
  opacity: 0;
  transform: translateY(-10px);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
    margin-top: 1rem;
  }
  
  &.success {
    color: #5DDC86;
    background-color: rgba(93, 220, 134, 0.1);
    border: 1px solid rgba(93, 220, 134, 0.2);
  }
  
  &.error {
    color: #FF6B6B;
    background-color: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.2);
  }
  
  &.info {
    color: #64B5F6;
    background-color: rgba(100, 181, 246, 0.1);
    border: 1px solid rgba(100, 181, 246, 0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;