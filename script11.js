 function openModal(facultyName) {
            document.getElementById('contactModal').style.display = 'block';
            document.getElementById('facultyName').value = facultyName;
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('errorSummary').style.display = 'none';
            clearForm();
        }

        function closeModal() {
            document.getElementById('contactModal').style.display = 'none';
            clearForm();
        }

        function clearForm() {
            document.getElementById('contactForm').reset();
            const facultyName = document.getElementById('facultyName').value;
            document.getElementById('contactForm').reset();
            document.getElementById('facultyName').value = facultyName;
            document.getElementById('charCount').textContent = '0/1000 characters';
            hideAllErrors();
        }

        function hideAllErrors() {
            const errorMessages = document.querySelectorAll('.error-message');
            const invalidFields = document.querySelectorAll('.field-invalid');
            errorMessages.forEach(error => error.style.display = 'none');
            invalidFields.forEach(field => field.classList.remove('field-invalid'));
            document.getElementById('errorSummary').style.display = 'none';
        }

        function showError(fieldId, message) {
            const errorElement = document.getElementById(fieldId + 'Error');
            const fieldElement = document.getElementById(fieldId);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
            if (fieldElement) {
                fieldElement.classList.add('field-invalid');
                fieldElement.style.borderColor = 'red';
            }
        }

        function hideError(fieldId) {
            const errorElement = document.getElementById(fieldId + 'Error');
            const fieldElement = document.getElementById(fieldId);
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            if (fieldElement) {
                fieldElement.classList.remove('field-invalid');
                fieldElement.style.borderColor = '';
            }
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validatePhone(phone) {
            if (!phone) return true; // Phone is optional
            const phoneRegex = /^[0-9]{10}$/;
            return phoneRegex.test(phone);
        }

        // Only allow numbers in phone input
        document.getElementById('phone').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });

        function validateForm() {
            let isValid = true;
            const errors = [];
            hideAllErrors();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate Full Name
            if (!fullName) {
                showError('fullName', 'Full name is required');
                errors.push('Full name is required');
                isValid = false;
            } else if (fullName.length < 2) {
                showError('fullName', 'Name must be at least 2 characters long');
                errors.push('Name must be at least 2 characters long');
                isValid = false;
            } else if (fullName.length > 50) {
                showError('fullName', 'Name must be less than 50 characters');
                errors.push('Name must be less than 50 characters');
                isValid = false;
            } else if (!/^[a-zA-Z\s.'-]+$/.test(fullName)) {
                showError('fullName', 'Name contains invalid characters');
                errors.push('Name contains invalid characters');
                isValid = false;
            }

            // Validate Email
            if (!email) {
                showError('email', 'Email address is required');
                errors.push('Email address is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                errors.push('Please enter a valid email address');
                isValid = false;
            }

            // Validate Phone (optional)
            if (phone && !validatePhone(phone)) {
                showError('phone', 'Phone number must be exactly 10 digits');
                errors.push('Phone number must be exactly 10 digits');
                isValid = false;
            }

            // Validate Message
            if (!message) {
                showError('message', 'Message is required');
                errors.push('Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters long');
                errors.push('Message must be at least 10 characters long');
                isValid = false;
            } else if (message.length > 1000) {
                showError('message', 'Message must be less than 1000 characters');
                errors.push('Message must be less than 1000 characters');
                isValid = false;
            }

            // Show error summary if there are errors
            if (errors.length > 0) {
                const errorSummary = document.getElementById('errorSummary');
                const errorList = document.getElementById('errorList');
                errorList.innerHTML = errors.map(error => `<li>${error}</li>`).join('');
                errorSummary.style.display = 'block';
                errorSummary.scrollIntoView({ behavior: 'smooth' });
            }

            return isValid;
        }

        // Character counter for message
        document.getElementById('message').addEventListener('input', function() {
            const current = this.value.length;
            const max = 1000;
            document.getElementById('charCount').textContent = `${current}/${max} characters`;
            
            if (current > max) {
                document.getElementById('charCount').style.color = 'red';
            } else {
                document.getElementById('charCount').style.color = '';
            }
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submitBtn');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending Message...';
                submitBtn.style.backgroundColor = '#ccc';
                
                // Simulate form submission
                setTimeout(() => {
                    document.getElementById('successMessage').style.display = 'block';
                    document.getElementById('errorSummary').style.display = 'none';
                    
                    const facultyName = document.getElementById('facultyName').value;
                    document.getElementById('contactForm').reset();
                    document.getElementById('facultyName').value = facultyName;
                    document.getElementById('charCount').textContent = '0/1000 characters';
                    
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    
                    setTimeout(() => {
                        closeModal();
                    }, 3000);
                }, 2000);
            }
        });

        // Real-time validation on field blur
        document.getElementById('fullName').addEventListener('blur', function() {
            const value = this.value.trim();
            if (!value) {
                showError('fullName', 'Full name is required');
            } else if (value.length < 2) {
                showError('fullName', 'Name must be at least 2 characters long');
            } else if (value.length > 50) {
                showError('fullName', 'Name must be less than 50 characters');
            } else if (!/^[a-zA-Z\s.'-]+$/.test(value)) {
                showError('fullName', 'Name contains invalid characters');
            } else {
                hideError('fullName');
            }
        });

        document.getElementById('email').addEventListener('blur', function() {
            const value = this.value.trim();
            if (!value) {
                showError('email', 'Email address is required');
            } else if (!validateEmail(value)) {
                showError('email', 'Please enter a valid email address');
            } else {
                hideError('email');
            }
        });

        document.getElementById('phone').addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !validatePhone(value)) {
                showError('phone', 'Phone number must be exactly 10 digits');
            } else {
                hideError('phone');
            }
        });

        document.getElementById('message').addEventListener('blur', function() {
            const value = this.value.trim();
            if (!value) {
                showError('message', 'Message is required');
            } else if (value.length < 10) {
                showError('message', 'Message must be at least 10 characters long');
            } else if (value.length > 1000) {
                showError('message', 'Message must be less than 1000 characters');
            } else {
                hideError('message');
            }
        });

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('contactModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Prevent form submission on Enter key except for textarea
        document.getElementById('contactForm').addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });