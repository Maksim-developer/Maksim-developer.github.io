// Перключение активных вкладок
const messenger = document.querySelector('.messenger') as HTMLElement;
if (messenger) {

    const activeItem = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        const item = target.closest('.nav-messenger__item') as HTMLElement;
        if (!item) return;

        e.preventDefault();
        const active = messenger.querySelector('.nav-messenger__item.--active') as HTMLElement;
        if (active) {
            active.classList.remove('--active');
        }
        item.classList.add('--active');
    }


    const messageEdits = document.querySelector('.messenger-edits') as HTMLElement | null;
    if (!messageEdits) throw new Error('messenger-edits not found');

    type ActionContext = 'messenger-box' | 'message' | 'messenger-pattern__item';
    type EditMenuItem = { text: string; trigger?: string };

    const messageEditsColumn = messageEdits.querySelector('.messenger-edits__column') as HTMLElement | null;

    const menuByContext: Record<ActionContext, EditMenuItem[]> = {
        'messenger-box': [
            { text: 'Ответить', trigger: 'messenger-reply' },
            { text: 'Копировать ссылку на сообщение' },
            { text: 'Копировать текст' },
            { text: 'Переслать', trigger: 'messenger-share' },
            { text: 'Выбрать', trigger: 'messenger-choice' },
            { text: 'Прикрепленные файлы', trigger: 'messenger-attach' },
        ],
        message: [
            { text: 'В архив' },
            { text: 'Без звука' },
            { text: 'Удалить чат' },
            { text: 'Закрепить чат' },
            { text: 'Вопрос решён' },
            { text: 'Записать на ремонт' },
            { text: 'Проценка' },
            // { text: 'Добавить шаблон', trigger: 'messenger-choice' },
        ],
        'messenger-pattern__item': [
            { text: 'Редактировать' },
            { text: 'Удалить' },
        ],
    };

    let currentContextType: ActionContext = 'messenger-box';
    let currentMessage: HTMLElement | null = null;
    let hideFallbackTimer: number | null = null;

    const renderMessageEdits = (contextType: ActionContext) => {
        if (!messageEditsColumn) return;

        const items = menuByContext[contextType];
        messageEditsColumn.innerHTML = '';

        items.forEach((item) => {
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'messenger-edits__item';
            link.textContent = item.text;
            if (item.trigger) {
                link.dataset.trigger = item.trigger;
            }
            messageEditsColumn.appendChild(link);
        });
    };

    const resolveContextTarget = (target: HTMLElement): { actionTarget: HTMLElement | null; contextType: ActionContext | null } => {
        const messageBox = target.closest('.messenger-box') as HTMLElement | null;
        if (messageBox) {
            return { actionTarget: messageBox, contextType: 'messenger-box' };
        }

        const messageCard = target.closest('.message') as HTMLElement | null;
        if (messageCard) {
            return { actionTarget: messageCard, contextType: 'message' };
        }

        const patternItem = target.closest('.messenger-pattern__item') as HTMLElement | null;
        if (patternItem) {
            return { actionTarget: patternItem, contextType: 'messenger-pattern__item' };
        }

        return { actionTarget: null, contextType: null };
    };

    const waitForHide = (): Promise<void> => {
        return new Promise((resolve) => {

            if (!messageEdits.classList.contains('--visible')) {
                resolve();
                return;
            }

            const onEnd = (ev: TransitionEvent) => {
                if (ev.target !== messageEdits) return;
                messageEdits.removeEventListener('transitionend', onEnd);
                if (hideFallbackTimer) { clearTimeout(hideFallbackTimer); hideFallbackTimer = null; }
                resolve();
            };

            messageEdits.addEventListener('transitionend', onEnd);


            hideFallbackTimer = window.setTimeout(() => {
                messageEdits.removeEventListener('transitionend', onEnd);
                hideFallbackTimer = null;
                resolve();
            }, 250);


            messageEdits.classList.remove('--visible');
        });
    };

    const positionMenu = (x: number, y: number) => {

        const rect = messageEdits.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let left = x, top = y;
        if (left + rect.width > vw) left = Math.max(8, vw - rect.width - 20);
        if (top + rect.height > vh) top = Math.max(8, vh - rect.height - 20);


        messageEdits.style.left = `${left}px`;
        messageEdits.style.top = `${top}px`;
    };

    const showMessageMenu = async (message: HTMLElement, contextType: ActionContext, x: number, y: number) => {
        if (currentMessage === message && messageEdits.classList.contains('--visible')) {
            messageEdits.classList.remove('--visible');
            currentMessage = null;
            return;
        }

        await waitForHide();

        currentContextType = contextType;
        renderMessageEdits(currentContextType);
        currentMessage = message;
        positionMenu(x, y);
        void messageEdits.offsetHeight;
        messageEdits.classList.add('--visible');
    };

    // document.addEventListener('contextmenu', async (e: MouseEvent) => {
    //     e.preventDefault();

    //     const target = e.target as HTMLElement;
    //     const { actionTarget, contextType } = resolveContextTarget(target);
    //     if (!actionTarget || !contextType) {
    //         currentMessage = null;
    //         return;
    //     }

    //     await showMessageMenu(actionTarget, contextType, e.clientX, e.clientY);
    // });

    let longPressTimer: number | null = null;
    let touchTargetMessage: HTMLElement | null = null;
    let touchStartX = 0;
    let touchStartY = 0;
    const LONG_PRESS_DELAY = 500;
    const TOUCH_MOVE_THRESHOLD = 10;

    const clearLongPress = () => {
        if (longPressTimer !== null) {
            window.clearTimeout(longPressTimer);
            longPressTimer = null;
        }
        touchTargetMessage = null;
    };

    document.addEventListener('touchstart', (e: TouchEvent) => {
        if (e.touches.length !== 1) {
            clearLongPress();
            return;
        }

        const touch = e.touches[0];
        const target = touch.target as HTMLElement;
        const { actionTarget } = resolveContextTarget(target);
        if (!actionTarget) {
            clearLongPress();
            return;
        }

        touchTargetMessage = actionTarget;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;

        longPressTimer = window.setTimeout(() => {
            if (!touchTargetMessage) return;
            const contextType: ActionContext = (touchTargetMessage.dataset.contextType as ActionContext | undefined)
                || (touchTargetMessage.classList.contains('messenger-box') ? 'messenger-box' : 'message');
            void showMessageMenu(touchTargetMessage, contextType, touchStartX, touchStartY);
            longPressTimer = null;
        }, LONG_PRESS_DELAY);
    }, { passive: true });

    document.addEventListener('touchmove', (e: TouchEvent) => {
        if (!touchTargetMessage || !e.touches.length) return;

        const touch = e.touches[0];
        const movedX = Math.abs(touch.clientX - touchStartX);
        const movedY = Math.abs(touch.clientY - touchStartY);
        if (movedX > TOUCH_MOVE_THRESHOLD || movedY > TOUCH_MOVE_THRESHOLD) {
            clearLongPress();
        }
    }, { passive: true });

    document.addEventListener('touchend', clearLongPress);
    document.addEventListener('touchcancel', clearLongPress);


    document.addEventListener('click', waitForHide);
    messenger.addEventListener('click', activeItem);
}

const holderInfo = document.querySelector('.holder-info') as HTMLElement;

// Пример работы поиска (Сообщения)
const messengerChoice = document.querySelector('[data-choice]') as HTMLElement;
if (messengerChoice) {
    const input = messengerChoice.querySelector('[data-choice-input]') as HTMLInputElement;
    const wrapper = messengerChoice.querySelector('[data-choice-wrapper]') as HTMLElement;

    const wrapperSecure = messengerChoice.querySelector('[data-secure]') as HTMLElement;
    const messagesInfo = messengerChoice.querySelector('[data-message]') as HTMLElement | null;
    const choiceItem = messengerChoice.querySelector('[data-choice-value].--active') as HTMLElement;
    const dropdown = messengerChoice.querySelector('.messenger-search__dropdown') as HTMLElement;
    const dropdownButton = messengerChoice.querySelector('.messenger-search__choice') as HTMLElement;

    let value = choiceItem.dataset.choiceValue as string;
    const searchInput = input;
    let searchClassTimeout: number | null = null;

    const updatePlaceholder = () => {
        searchInput.placeholder = value === 'messages'
            ? 'Поиск по всем мессенджерам'
            : 'Поиск по Ф.И.О. или номеру автомобиля';
    };

    updatePlaceholder();

    const getSearchTerm = () => searchInput.value.trim().toLowerCase();

    const clearHighlights = (element: HTMLElement | null) => {
        if (!element) {
            return;
        }
        element.querySelectorAll('mark').forEach((mark) => {
            mark.replaceWith(document.createTextNode(mark.textContent || ''));
        });
    };

    const highlightMatch = (element: HTMLElement | null, term: string) => {
        if (!element || !term) {
            return;
        }

        const text = element.textContent || '';
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');

        if (!regex.test(text)) {
            return;
        }

        element.innerHTML = text.replace(regex, '<mark>$1</mark>');
    };

    const filterMessages = () => {
        const term = getSearchTerm();
        const messages = Array.from(document.querySelectorAll<HTMLElement>('.message'));

        wrapper.classList.add('--search');
        if (searchClassTimeout !== null) {
            window.clearTimeout(searchClassTimeout);
        }
        searchClassTimeout = window.setTimeout(() => wrapper.classList.remove('--search'), 1000);

        messages.forEach((message) => {
            const nameElement = message.querySelector('.message__name') as HTMLElement | null;
            const numberElement = message.querySelector('.message__number') as HTMLElement | null;
            const textElement = message.querySelector('.message__text') as HTMLElement | null;
            const boxElement = message.closest('.messenger__box') as HTMLElement | null;

            clearHighlights(textElement);
            boxElement?.classList.remove('--search');

            if (!term) {
                message.classList.remove('--hide');
                message.style.removeProperty('max-height');
                message.style.removeProperty('overflow');
                message.style.removeProperty('--height');
                return;
            }

            const nameText = (nameElement?.textContent || '').toLowerCase();
            const numberText = (numberElement?.textContent || '').toLowerCase();
            const messageText = (textElement?.textContent || '').toLowerCase();
            const match = value === 'clients'
                ? nameText.includes(term) || numberText.includes(term)
                : value === 'messages'
                    ? messageText.includes(term)
                    : false;

            if (match) {
                message.classList.remove('--hide');
                message.style.removeProperty('--height');

                if (value === 'messages') {
                    highlightMatch(textElement, term);
                    boxElement?.classList.add('--search');
                }
            } else {
                message.style.setProperty('--height', `${message.offsetHeight}px`);
                message.classList.add('--hide');
            }
        });

        if (messagesInfo) {
            const allHidden = messages.every((message) => message.classList.contains('--hide'));
            messagesInfo.classList.toggle('--visible', allHidden);
        }
    };

    searchInput.addEventListener('input', filterMessages);

    const movedMessageData = new WeakMap<HTMLElement, { parent: Node; nextSibling: Node | null }>();

    const toggleDropdown = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        const clickedDropdownBtn = target.closest('.messenger-search__choice') as HTMLElement;
        const dropdownItem = target.closest('.messenger-search__item') as HTMLElement;

        if (clickedDropdownBtn) {
            ev.preventDefault();
            dropdown.classList.toggle('--active');
            return;
        }

        if (dropdownItem) {
            ev.preventDefault();
            const itemActive = messengerChoice.querySelector('.messenger-search__item.--active') as HTMLElement;
            if (itemActive) {
                itemActive.classList.remove('--active');
            }
            value = dropdownItem.dataset.choiceValue as string;
            dropdownItem.classList.add('--active');
            const dropdownLabel = dropdownButton.querySelector('span');
            if (dropdownLabel) {
                dropdownLabel.textContent = dropdownItem.textContent;
            }
            dropdown.classList.remove('--active');
            updatePlaceholder();
            filterMessages();
        }
    }

    const closeDropdown = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        if (!dropdown.contains(target)) {
            dropdown.classList.remove('--active');
        }
    }

    const buttonSecure = (button: HTMLElement) => {
        if (!button || button.dataset.secure !== 'true') {
            return;
        }
        const message = button.closest('.message') as HTMLElement;
        if (movedMessageData.has(message)) {
            const saved = movedMessageData.get(message)!;
            saved.parent.insertBefore(message, saved.nextSibling);
            movedMessageData.delete(message);
            message.classList.remove('--secure');
        } else {
            movedMessageData.set(message, {
                parent: message.parentNode as Node,
                nextSibling: message.nextSibling,
            });
            message.classList.add('--secure');
            wrapperSecure.insertBefore(message, wrapperSecure.firstChild);
        }

    }

    const buttonsState = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;

        const button = target.closest('.message-nav__btn') as HTMLElement;

        if (!button) {
            return;
        }

        button.classList.toggle('--disable');

        buttonSecure(button);

        if (button.classList.contains('--disable') && button.dataset.holderChange) {
            holderInfo.textContent = button.dataset.holderChange as string;
        } else if (button.dataset.holder) {
            holderInfo.textContent = button.dataset.holder as string;
        }
    }

    messengerChoice.addEventListener('click', toggleDropdown);
    document.addEventListener('click', closeDropdown);
    document.addEventListener('click', buttonsState);

}


// Высота чата и нижней панели
const messengerPanel = document.querySelector('.messenger-panel__input') as HTMLElement | null;
const messengerChat = document.querySelector('.messenger-chat') as HTMLElement | null;
let refreshMessengerPanelHeight: (() => void) | null = null;
if (messengerPanel && messengerChat) {

    const messengerNav = messengerChat.querySelector('.messenger-panel') as HTMLElement | null;
    let panelHeightRaf = 0;

    const panelHeight = () => {
        messengerPanel.style.height = 'auto';
        messengerPanel.style.height = messengerPanel.scrollHeight + 'px';

        if (messengerNav) {
            messengerChat.style.setProperty('--panel-height', messengerNav.offsetHeight + 'px');
        }
    };

    const schedulePanelHeight = () => {
        if (panelHeightRaf) {
            cancelAnimationFrame(panelHeightRaf);
        }
        panelHeightRaf = requestAnimationFrame(() => {
            panelHeight();
            panelHeightRaf = 0;
        });
    };

    refreshMessengerPanelHeight = schedulePanelHeight;
    messengerPanel.addEventListener('input', panelHeight);
    messengerNav?.addEventListener('transitionend', schedulePanelHeight);
    window.addEventListener('resize', schedulePanelHeight);

    panelHeight()
}

// Открытие дополнительных окон по клику
const buttonsTriggers = (ev: MouseEvent) => {
    const target = ev.target as HTMLElement;
    const targetBtn = target.closest('[data-trigger]') as HTMLElement | null;
    const closeBtn = target.closest('[data-close]') as HTMLElement | null;

    const getPanelByTrigger = (triggerBtn: HTMLElement) => {
        const panelName = triggerBtn.dataset.trigger;
        if (!panelName) return null;
        return document.querySelector(`.${panelName}`) as HTMLElement | null;
    };

    const closeTrigger = (triggerBtn: HTMLElement) => {
        triggerBtn.classList.remove('--active');
        getPanelByTrigger(triggerBtn)?.classList.remove('--active');
        refreshMessengerPanelHeight?.();
    };

    const getTriggerPanelNames = () => {
        const names = new Set<string>();
        document.querySelectorAll<HTMLElement>('[data-trigger]').forEach(btn => {
            const panelName = btn.dataset.trigger;
            if (panelName) names.add(panelName);
        });
        return Array.from(names);
    };

    const closeAllTriggers = (exceptName?: string) => {
        getTriggerPanelNames().forEach((panelName) => {
            if (exceptName && panelName === exceptName) return;

            document
                .querySelectorAll<HTMLElement>(`[data-trigger="${panelName}"]`)
                .forEach((btn) => btn.classList.remove('--active'));

            document
                .querySelectorAll<HTMLElement>(`.${panelName}.--active`)
                .forEach((panel) => panel.classList.remove('--active'));
        });
    };

    const anyActive = document.querySelector('[data-trigger].--active, [class*="messenger-"].--active') !== null;
    if (!anyActive && !targetBtn && !closeBtn) return;

    if (targetBtn) {
        ev.preventDefault();

        const name = targetBtn.dataset.trigger;
        if (!name) return;
        const isActive = targetBtn.classList.contains('--active')
            || document.querySelector(`.${name}.--active`) !== null;

        closeAllTriggers(name);

        if (isActive) {
            closeTrigger(targetBtn);
        } else {
            targetBtn.classList.add('--active');
            document.querySelectorAll<HTMLElement>(`[data-trigger="${name}"]`)
                .forEach((btn) => btn.classList.add('--active'));
            document.querySelectorAll<HTMLElement>(`.${name}`)
                .forEach((panel) => panel.classList.add('--active'));
            refreshMessengerPanelHeight?.();
        }
        return;
    }

    if (closeBtn) {
        ev.preventDefault();
        closeAllTriggers();
        refreshMessengerPanelHeight?.();
        return;
    }

    const clickedInsideActivePanel = getTriggerPanelNames().some((panelName) => {
        const panel = document.querySelector(`.${panelName}.--active`) as HTMLElement | null;
        const trigger = document.querySelector(`[data-trigger="${panelName}"].--active`) as HTMLElement | null;
        return Boolean(panel?.contains(target) || trigger?.contains(target));
    });

    if (!clickedInsideActivePanel) {
        closeAllTriggers();
        refreshMessengerPanelHeight?.();
    }
};
document.addEventListener('click', buttonsTriggers);


// Подсказка при наведении
if (holderInfo) {
    let activeHolder: HTMLElement | null = null;

    const updateHolderInfoPosition = (holder: HTMLElement) => {
        const rect = holder.getBoundingClientRect();
        const text = holder.classList.contains('--disable') && holder.dataset.holderChange
            ? holder.dataset.holderChange
            : holder.dataset.holder;

        holderInfo.textContent = text as string;

        requestAnimationFrame(() => {
            const width = holderInfo.offsetWidth;
            const viewportWidth = window.innerWidth;
            const minLeft = 8;
            const maxLeft = viewportWidth - width - 8;
            let left = rect.left + rect.width / 2 - width / 2;

            if (left < minLeft) {
                left = rect.left;
            } else if (left + width > viewportWidth - minLeft) {
                left = rect.left + rect.width - width;
            }

            if (left < minLeft) {
                left = minLeft;
            } else if (left > maxLeft) {
                left = maxLeft;
            }

            holderInfo.style.top = `${rect.bottom}px`;
            holderInfo.style.left = `${left}px`;
            holderInfo.classList.add('--active');
        });
    };

    const handleHolderMouseOver = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        const holder = target.closest('[data-holder]') as HTMLElement | null;
        const related = ev.relatedTarget as HTMLElement | null;

        if (!holder || holder === activeHolder || (related && holder.contains(related))) {
            return;
        }

        activeHolder = holder;
        updateHolderInfoPosition(holder);
    };

    const handleHolderMouseOut = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        const holder = target.closest('[data-holder]') as HTMLElement | null;
        const related = ev.relatedTarget as HTMLElement | null;

        if (!holder || holder !== activeHolder || (related && holder.contains(related))) {
            return;
        }

        activeHolder = null;
        holderInfo.classList.remove('--active');

    };

    document.addEventListener('mouseover', handleHolderMouseOver);
    document.addEventListener('mouseout', handleHolderMouseOut);
}


// Копировать в буфер обмена
const copyButton = document.querySelectorAll<HTMLElement>('.messenger-copy');
const copyHolder = document.querySelector('.copy-holder') as HTMLElement | null;
if (copyHolder) {

    const copyValue = (buttonCopy: string, buttonName?: string): void => {
        if (!buttonName) {
            return;
        }
        navigator.clipboard.writeText(buttonCopy)
            .then(() => {
                copyHolder.textContent = buttonName;

                copyHolder.classList.add('--visible');

                setTimeout(() => {
                    copyHolder.classList.remove('--visible');
                }, 1000);
            })
            .catch(error => {
                console.error(`Текст не скопирован: ${error}`);
            });
    };

    copyButton.forEach(button => {
        const buttonElement = button as HTMLElement;
        const buttonName = buttonElement.dataset.label;
        const buttonCopy = (buttonElement.querySelector('span') as HTMLElement | null)?.textContent?.trim() || '';

        buttonElement.addEventListener('click', () => {

            if (buttonCopy) {
                copyValue(buttonCopy, buttonName);
            }
        });
    });
}

// Эмодзи-пикер в поле ввода сообщения
const emojiTrigger = document.querySelector('[data-emoji-trigger]') as HTMLElement | null;
const messageInput = document.querySelector('.messenger-panel__input') as HTMLTextAreaElement | null;
const EmojiButtonCtor = (window as unknown as {
    EmojiButton?: new (options?: unknown) => {
        on: (event: string, callback: (selection: { emoji: string }) => void) => void;
        togglePicker: (element: HTMLElement) => void;
        hidePicker: () => void;
    }
}).EmojiButton;
if (emojiTrigger && messageInput) {
    const initEmojiPicker = () => {
        const CurrentEmojiButtonCtor = (window as unknown as {
            EmojiButton?: new (options?: unknown) => {
                on: (event: string, callback: (selection: { emoji: string }) => void) => void;
                togglePicker: (element: HTMLElement) => void;
                hidePicker: () => void;
            }
        }).EmojiButton;
        if (typeof CurrentEmojiButtonCtor !== 'function') return;

        const picker = new CurrentEmojiButtonCtor({
            position: 'top-start',
            autoHide: false,
            theme: 'dark',
            lang: 'ru',
        });

        picker.on('emoji', (selection) => {
            const { selectionStart, selectionEnd, value } = messageInput;
            const nextValue = `${value.slice(0, selectionStart)}${selection.emoji}${value.slice(selectionEnd)}`;
            messageInput.value = nextValue;

            const nextCaret = selectionStart + selection.emoji.length;
            messageInput.setSelectionRange(nextCaret, nextCaret);
            messageInput.dispatchEvent(new Event('input', { bubbles: true }));
            messageInput.focus();
        });

        emojiTrigger.addEventListener('click', (ev) => {
            ev.preventDefault();
            picker.togglePicker(emojiTrigger);
        });

        document.addEventListener('click', (ev) => {
            const target = ev.target as HTMLElement;
            const pickerElement = target.closest('.emoji-picker') as HTMLElement | null;
            if (!pickerElement && !emojiTrigger.contains(target)) {
                picker.hidePicker();
            }
        });
    };

    if (typeof EmojiButtonCtor === 'function') {
        initEmojiPicker();
    } else {
        window.addEventListener('emoji-button-ready', initEmojiPicker, { once: true });
    }
}

// Открытие создание нового шаблона 
const messengerPattern = document.querySelector('.messenger-pattern') as HTMLElement | null;
if (messengerPattern) {

    const patternState = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;

        const targetBtn = target.closest('.messenger-pattern__add') as HTMLElement | null;
        const closeBtn = target.closest('.messenger-pattern__back') as HTMLElement | null;

        const anyActive = document.querySelector('.messenger-pattern.--show') !== null;

        if (targetBtn) {
            messengerPattern.classList.add('--show');
        }

        if (closeBtn && anyActive) {
            messengerPattern.classList.remove('--show');
        }
    }

    messengerPattern.addEventListener('click', patternState);

}

// Кнопка скролла чата
const chatUp = document.querySelector('.messenger-chat__up') as HTMLElement | null;
const chatWrapper = document.querySelector('.messenger-chat__window') as HTMLElement | null;
if (chatUp && chatWrapper) {
    const BOTTOM_EPS = 2; // допуск для погрешности в пикселях
    let rafId: number | null = null;

    const canScroll = () => chatWrapper.scrollHeight > chatWrapper.clientHeight + 0.5;
    const isAtBottom = () => chatWrapper.scrollTop + chatWrapper.clientHeight >= chatWrapper.scrollHeight - BOTTOM_EPS;

    const updateVisibility = () => {
        if (!canScroll() || isAtBottom()) {
            chatUp.classList.add('--hide');
        } else {
            chatUp.classList.remove('--hide');
        }
    }

    chatWrapper.addEventListener('scroll', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            updateVisibility();
            rafId = null;
        });
    });

    window.addEventListener('resize', updateVisibility);

    const mo = new MutationObserver(() => updateVisibility());
    mo.observe(chatWrapper, { childList: true, subtree: true, characterData: true });

    chatUp.addEventListener('click', () => {
        const last = chatWrapper.querySelector<HTMLElement>(':scope > .messenger-box:last-child');
        if (last) last.scrollIntoView({ behavior: 'smooth', block: 'end' });
        else chatWrapper.scrollTo({ top: chatWrapper.scrollHeight - chatWrapper.clientHeight, behavior: 'smooth' });

        chatUp.classList.add('--hide');
    });

    updateVisibility();

}




// Открыть фото
// @ts-ignore
const gallery = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
});



