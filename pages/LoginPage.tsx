import React, { useState } from 'react';
import { User } from '../types';

interface LoginPageProps {
    onBack: () => void;
    onLogin: (user: User) => void;
}

const InfoPopup: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
        <p>{message}</p>
        <style>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          90% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 20px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out forwards;
        }
      `}</style>
    </div>
);

export const LoginPage: React.FC<LoginPageProps> = ({ onBack, onLogin }) => {
    const [view, setView] = useState<'login' | 'register' | 'verify' | 'forgot'>('login');
    
    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [forgotEmail, setForgotEmail] = useState('');

    // UI state
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const displayPopup = (message: string) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        displayPopup("Código enviado! Verifique seu email.");
        setTimeout(() => {
            setView('verify');
        }, 3000);
    };
    
    const handleVerifySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (verificationCode.length === 6 && /^\d{6}$/.test(verificationCode)) {
            onLogin({
                name: name,
                email: email,
                avatar: `https://i.pravatar.cc/150?u=${email}`
            });
        } else {
            alert("Por favor, insira um código válido de 6 dígitos.");
        }
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin({
            name: "Maria Silva",
            email: "maria.silva@example.com",
            avatar: "https://i.pravatar.cc/150?img=5"
        });
    };

    const handleForgotPasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        displayPopup("Se o e-mail estiver cadastrado, as instruções foram enviadas.");
        setTimeout(() => {
            setView('login');
            setForgotEmail('');
        }, 3000);
    };

    const inputClasses = "w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#66CDAA] focus:border-transparent";
    const buttonClasses = "w-full px-8 py-3 bg-[#66CDAA] text-white font-bold rounded-md shadow-md hover:bg-[#5F9EA0] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#66CDAA]";
    const tabBaseClasses = "w-1/2 py-3 text-center font-semibold cursor-pointer transition-colors duration-300";
    const tabActiveClasses = "text-[#66CDAA] border-b-2 border-[#66CDAA]";
    const tabInactiveClasses = "text-gray-500 hover:text-gray-700";

    const renderContent = () => {
        if (view === 'verify') {
            return (
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">Verifique seu email</h2>
                    <p className="text-center text-gray-600 mb-6">Enviamos um código de 6 dígitos para <span className="font-semibold">{email}</span>.</p>
                    <form className="space-y-6" onSubmit={handleVerifySubmit}>
                        <div>
                            <label htmlFor="verification-code" className="sr-only">Código de Verificação</label>
                            <input
                                id="verification-code"
                                name="code"
                                type="text"
                                pattern="\d{6}"
                                maxLength={6}
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                required
                                className={inputClasses + " text-center tracking-[0.8em] font-mono"}
                                placeholder="------"
                            />
                        </div>
                        <div>
                            <button type="submit" className={buttonClasses}>
                                Verificar e Entrar
                            </button>
                        </div>
                    </form>
                </div>
            );
        }

        if (view === 'forgot') {
            return (
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">Recuperar Senha</h2>
                    <p className="text-center text-gray-600 mb-6">Insira seu e-mail para receber as instruções de recuperação.</p>
                    <form className="space-y-6" onSubmit={handleForgotPasswordSubmit}>
                        <div>
                            <label htmlFor="email-forgot" className="sr-only">Email</label>
                            <input id="email-forgot" name="email" type="email" autoComplete="email" required className={inputClasses} placeholder="Seu email de cadastro" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
                        </div>
                        <div>
                            <button type="submit" className={buttonClasses}>
                                Enviar Instruções
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <button onClick={() => setView('login')} className="font-medium text-sm text-gray-600 hover:text-gray-800">
                            Lembrei minha senha
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <>
                <div className="flex border-b mb-8">
                    <button
                        onClick={() => setView('login')}
                        className={`${tabBaseClasses} ${view === 'login' ? tabActiveClasses : tabInactiveClasses}`}
                    >
                        Entrar
                    </button>
                    <button
                        onClick={() => setView('register')}
                        className={`${tabBaseClasses} ${view === 'register' ? tabActiveClasses : tabInactiveClasses}`}
                    >
                        Cadastrar
                    </button>
                </div>

                {view === 'login' ? (
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                            Bem-vinda de volta!
                        </h2>
                        <form className="space-y-6" onSubmit={handleLoginSubmit}>
                            <div>
                                <label htmlFor="email-login" className="sr-only">Email</label>
                                <input id="email-login" name="email" type="email" autoComplete="email" required className={inputClasses} placeholder="Seu email" />
                            </div>
                            <div>
                                <label htmlFor="password-login" className="sr-only">Senha</label>
                                <input id="password-login" name="password" type="password" autoComplete="current-password" required className={inputClasses} placeholder="Sua senha" />
                            </div>
                            <div className="flex items-center justify-end">
                                <div className="text-sm">
                                    <button type="button" onClick={() => setView('forgot')} className="font-medium text-[#66CDAA] hover:text-[#5F9EA0]">
                                        Esqueceu sua senha?
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className={buttonClasses}>
                                    Entrar
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                            Crie sua conta
                        </h2>
                        <form className="space-y-6" onSubmit={handleRegisterSubmit}>
                            <div>
                                <label htmlFor="name-register" className="sr-only">Nome completo</label>
                                <input id="name-register" name="name" type="text" autoComplete="name" required className={inputClasses} placeholder="Seu nome completo" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="email-register" className="sr-only">Email</label>
                                <input id="email-register" name="email" type="email" autoComplete="email" required className={inputClasses} placeholder="Seu email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password-register" className="sr-only">Senha</label>
                                <input id="password-register" name="password" type="password" required className={inputClasses} placeholder="Crie uma senha" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <button type="submit" className={buttonClasses}>
                                    Criar conta
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="min-h-[calc(100vh-250px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {showPopup && <InfoPopup message={popupMessage} />}
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    {renderContent()}
                </div>
                <div className="text-center">
                    <button onClick={onBack} className="font-medium text-gray-600 hover:text-gray-800">&larr; Voltar para a página inicial</button>
                </div>
            </div>
        </div>
    );
};
