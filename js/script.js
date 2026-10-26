// Small interactions for the Paw Haven student website.
// Form submissions use the owner's Google Apps Script web app.
const PAW_HAVEN_FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzlPG0209sQ0p4G9fpF4gK6WLMxUh8AIhnFndBMg65lE9BxSn-vRzgXMUEuSHQ6M3_oHA/exec';

document.addEventListener('DOMContentLoaded', function () {
    setupAnimalSearch();
    setupLightbox();
    setupEnquiryForm();
    setupContactForm();
});

// Search, filter and sort only run on pages that contain the animal list.
function setupAnimalSearch() {
    const animalList = document.getElementById('animal-list');
    if (!animalList) return;

    const searchInput = document.getElementById('animal-search');
    const typeFilter = document.getElementById('animal-type-filter');
    const sortSelect = document.getElementById('animal-sort');
    const resultsMessage = document.getElementById('animal-results');
    const emptyMessage = document.getElementById('no-animals');
    const cards = Array.from(animalList.querySelectorAll('.animal-card'));
    if (!searchInput || !typeFilter || !sortSelect || !resultsMessage || !emptyMessage) return;

    function updateAnimals() {
        const searchText = searchInput.value.trim().toLowerCase();
        const chosenType = typeFilter.value;
        const sortOrder = sortSelect.value;

        cards.sort(function (first, second) {
            if (sortOrder === 'name') {
                return first.querySelector('h2').textContent.localeCompare(second.querySelector('h2').textContent);
            }
            if (sortOrder === 'age-young') {
                return Number(first.dataset.age) - Number(second.dataset.age);
            }
            if (sortOrder === 'age-old') {
                return Number(second.dataset.age) - Number(first.dataset.age);
            }
            return Number(first.dataset.order) - Number(second.dataset.order);
        });

        let visibleCount = 0;
        cards.forEach(function (card) {
            const matchesText = card.textContent.toLowerCase().includes(searchText);
            const matchesType = chosenType === 'all' || card.dataset.animalType === chosenType;
            const shouldShow = matchesText && matchesType;
            card.hidden = !shouldShow;
            if (shouldShow) visibleCount += 1;
            animalList.appendChild(card);
        });

        resultsMessage.textContent = visibleCount === 1
            ? 'Showing 1 animal profile.'
            : 'Showing ' + visibleCount + ' animal profiles.';
        emptyMessage.hidden = visibleCount !== 0;
    }

    searchInput.addEventListener('input', updateAnimals);
    typeFilter.addEventListener('change', updateAnimals);
    sortSelect.addEventListener('change', updateAnimals);
}

// A dialog lets visitors inspect an animal photo without leaving the Adopt page.
function setupLightbox() {
    const images = document.querySelectorAll('[data-lightbox]');
    if (images.length === 0 || typeof HTMLDialogElement === 'undefined') return;

    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox-dialog';
    dialog.setAttribute('aria-label', 'Larger animal photograph');
    dialog.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close image">Close</button><img alt=""><p class="lightbox-caption"></p>';
    document.body.appendChild(dialog);

    const largeImage = dialog.querySelector('img');
    const caption = dialog.querySelector('.lightbox-caption');
    const closeButton = dialog.querySelector('.lightbox-close');

    function openImage(image) {
        largeImage.src = image.currentSrc || image.src;
        largeImage.alt = image.alt;
        caption.textContent = image.alt;
        dialog.showModal();
        closeButton.focus();
    }

    images.forEach(function (image) {
        image.addEventListener('click', function () { openImage(image); });
        image.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openImage(image);
            }
        });
    });

    closeButton.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) {
        if (event.target === dialog) dialog.close();
    });
}

// Show field-specific validation messages and expose invalid fields to assistive technology.
function showFieldError(field, message) {
    const error = document.getElementById(field.id + '-error');
    if (error) error.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateForm(form) {
    let formIsValid = true;
    const fields = Array.from(form.querySelectorAll('input, select, textarea'));

    fields.forEach(function (field) {
        // The hidden animal choice is checked only when the visitor selects adoption.
        if (field.closest('[hidden]')) return;

        let message = '';
        if (field.validity.valueMissing) {
            message = 'Please complete this field.';
        } else if (field.validity.typeMismatch) {
            message = 'Please enter a valid email address.';
        } else if (field.validity.tooShort) {
            message = 'Please enter at least ' + field.minLength + ' characters.';
        } else if (field.validity.patternMismatch) {
            message = field.title || 'Please use the requested format.';
        }

        showFieldError(field, message);
        if (message) formIsValid = false;
    });

    if (!formIsValid) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
    }
    return formIsValid;
}

function getConfiguredRecipient(form) {
    const recipient = (form.dataset.recipient || '').trim();
    if (!recipient || recipient.endsWith('@example.com') || recipient.includes('your-email')) {
        return '';
    }
    return recipient;
}

// Send URL-encoded form data without a CORS preflight. The opaque response cannot confirm delivery.
async function sendFormByEmail(recipient, payload) {
    const formPayload = new URLSearchParams();
    Object.keys(payload).forEach(function (key) {
        if (payload[key] !== undefined && payload[key] !== null) {
            formPayload.append(key, String(payload[key]));
        }
    });
    formPayload.set('formType', payload.formType || 'Website form');

    await fetch(PAW_HAVEN_FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: formPayload
    });

    return { submitted: true };
}

function setFormBusy(form, isBusy) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;
    submitButton.disabled = isBusy;
    submitButton.textContent = isBusy ? 'Sending…' : submitButton.dataset.originalLabel;
}

function prepareFormButtons() {
    document.querySelectorAll('form[data-form] button[type="submit"]').forEach(function (button) {
        button.dataset.originalLabel = button.textContent;
    });
}

function setupEnquiryForm() {
    const form = document.querySelector('[data-form="enquiry"]');
    if (!form) return;

    const typeSelect = document.getElementById('enquiry-type');
    const animalGroup = document.getElementById('animal-choice-group');
    const animalSelect = document.getElementById('enquiry-animal');
    const status = document.getElementById('enquiry-status');
    const nameField = document.getElementById('enquiry-name');
    if (!typeSelect || !animalGroup || !animalSelect || !status || !nameField) return;

    const query = new URLSearchParams(window.location.search);
    const animalFromLink = query.get('animal');
    if (animalFromLink) {
        typeSelect.value = 'adopt';
        animalGroup.hidden = false;
        animalSelect.required = true;
        if (Array.from(animalSelect.options).some(function (option) { return option.value === animalFromLink; })) {
            animalSelect.value = animalFromLink;
        }
    }

    function updateAnimalField() {
        const needsAnimal = typeSelect.value === 'adopt';
        animalGroup.hidden = !needsAnimal;
        animalSelect.required = needsAnimal;
        if (!needsAnimal) {
            animalSelect.value = '';
            showFieldError(animalSelect, '');
        }
    }
    typeSelect.addEventListener('change', updateAnimalField);

    form.querySelectorAll('input, select, textarea').forEach(function (field) {
        field.addEventListener('input', function () { showFieldError(field, ''); });
        field.addEventListener('change', function () { showFieldError(field, ''); });
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        status.textContent = '';
        status.className = 'form-status';
        if (!validateForm(form)) {
            status.textContent = 'Please correct the highlighted fields and try again.';
            status.classList.add('error');
            return;
        }

        const data = new FormData(form);
        const name = nameField.value.trim();
        const type = typeSelect.value;
        const recipient = getConfiguredRecipient(form);
        const typeLabels = {
            adopt: 'Adoption enquiry',
            volunteer: 'Volunteer enquiry',
            sponsor: 'Sponsorship enquiry',
            other: 'General enquiry'
        };
        const payload = Object.fromEntries(data.entries());
        payload.formType = typeLabels[type] || 'Enquiry';

        if (recipient) {
            setFormBusy(form, true);
            try {
                await sendFormByEmail(recipient, payload);
                status.textContent = 'Thank you, ' + name + '. Your enquiry request was sent to the form handler. The browser cannot verify email delivery, so the owner must confirm it appears in the spreadsheet. This fictional student project does not confirm real animal availability or an appointment.';
                status.classList.add('success');
                form.reset();
                updateAnimalField();
            } catch (error) {
                const detail = error instanceof Error ? error.message : 'Please try again later.';
                status.textContent = 'Your enquiry was not confirmed as sent. ' + detail + ' Your entries have been kept so you can try again.';
                status.classList.add('error');
            } finally {
                setFormBusy(form, false);
            }
            return;
        }

        status.textContent = 'Your enquiry passed the form checks, but no message was sent because delivery is not configured.';
        status.classList.add('error');
    });
}

function setupContactForm() {
    const form = document.querySelector('[data-form="contact"]');
    if (!form) return;

    const status = document.getElementById('contact-status');
    if (!status) return;
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
        field.addEventListener('input', function () { showFieldError(field, ''); });
        field.addEventListener('change', function () { showFieldError(field, ''); });
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        status.textContent = '';
        status.className = 'form-status';
        if (!validateForm(form)) {
            status.textContent = 'Please correct the highlighted fields and try again.';
            status.classList.add('error');
            return;
        }

        const data = new FormData(form);
        const recipient = getConfiguredRecipient(form);
        const payload = Object.fromEntries(data.entries());
        payload.formType = 'Contact message: ' + (data.get('messageType') || 'General');

        if (!recipient) {
            status.textContent = 'Email delivery is not configured. No message was sent. Please check the website form configuration.';
            status.classList.add('error');
            return;
        }

        setFormBusy(form, true);
        try {
            await sendFormByEmail(recipient, payload);
            status.textContent = 'Your message request was sent to the form handler. The browser cannot verify email delivery, so the owner must confirm it appears in the spreadsheet.';
            status.classList.add('success');
            form.reset();
        } catch (error) {
            const detail = error instanceof Error ? error.message : 'Please try again later.';
            status.textContent = 'Your message was not confirmed as sent. ' + detail + ' Your entries have been kept so you can try again.';
            status.classList.add('error');
        } finally {
            setFormBusy(form, false);
        }
    });
}

prepareFormButtons();